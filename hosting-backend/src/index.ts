import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import multer from "multer";
import {
  checkDatabaseConnection,
  dbPool,
  ensureMessagesTable,
  ensureOrdersTable,
} from "./db";
import nodemailer from "nodemailer";
import Stripe from "stripe";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const uploadsDir = path.resolve(__dirname, "../uploads");
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? "";
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
const stripeCurrency = "usd";
const stripePlanPriceIds: Record<string, string | undefined> = {
  "hosting-9-99": process.env.STRIPE_PRICE_HOSTING_9_99_MONTHLY,
  "full-stack-19-99": process.env.STRIPE_PRICE_FULL_STACK_19_99_MONTHLY,
};
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2026-03-25.dahlia",
    })
  : null;

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const isZip =
      file.mimetype === "application/zip" ||
      file.mimetype === "application/x-zip-compressed" ||
      file.originalname.toLowerCase().endsWith(".zip");
    if (!isZip) {
      cb(new Error("Only ZIP files are allowed."));
      return;
    }
    cb(null, true);
  },
});

app.use(cors());
app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    if (!stripe || !stripeWebhookSecret) {
      return res.status(503).json({
        status: "error",
        message: "Stripe webhook is not configured.",
      });
    }

    const signature = req.header("stripe-signature");
    if (!signature) {
      return res.status(400).json({
        status: "error",
        message: "Missing stripe-signature header.",
      });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, stripeWebhookSecret);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid Stripe signature.";
      return res.status(400).json({
        status: "error",
        message,
      });
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderIdRaw = session.metadata?.orderId ?? "";
        const orderId = Number(orderIdRaw);
        if (Number.isInteger(orderId) && orderId > 0) {
          await dbPool.execute(
            `UPDATE order_requests
             SET payment_status = 'paid',
                 paid_at = CURRENT_TIMESTAMP,
                 stripe_customer_id = ?,
                 stripe_subscription_id = ?,
                 stripe_checkout_session_id = ?
             WHERE id = ?`,
            [
              typeof session.customer === "string" ? session.customer : null,
              typeof session.subscription === "string" ? session.subscription : null,
              session.id,
              orderId,
            ],
          );

          const [orderRowsRaw] = await dbPool.execute(
            `SELECT
               id,
               name,
               email,
               preferred_domain_name,
               message,
               backup_domain_ideas,
               payment_plan,
               project_zip_path,
               payment_status,
               stripe_checkout_session_id,
               stripe_subscription_id,
               payment_currency,
               paid_at,
               created_at
             FROM order_requests
             WHERE id = ?
             LIMIT 1`,
            [orderId],
          );
          const orderRows = orderRowsRaw as OrderRow[];
          const order = orderRows[0];

          const recipient = resolveCheckoutRecipientEmail(order, session);
          if (recipient) {
            const plainTextBody = order
              ? `Hi ${order.name},\n\nYour payment was successful and your order is now confirmed.\n\nOrder ID: #${order.id}\nPlan: ${formatPlanLabel(order.payment_plan)}\nPreferred domain: ${order.preferred_domain_name ?? "Not provided"}\nUploaded file: ${path.basename(order.project_zip_path)}\n\nI will review your project and contact you shortly.\n\nThanks,\nStrelements`
              : "Your subscription payment was received successfully. I will now continue with your order setup.";
            const bcc = orderConfirmationBcc(recipient);
            await sendEmailToClient(
              recipient,
              "Order confirmed - Strelements",
              plainTextBody,
              order
                ? renderOrderConfirmationHtml(order)
                : renderEmailShell(
                    "Payment received",
                    toHtmlParagraphs(
                      "Your subscription payment was received successfully.\nI will now continue with your order setup.",
                    ),
                  ),
              bcc ? { bcc } : undefined,
            );
          } else {
            console.error(
              `[WEBHOOK] checkout.session.completed | orderId=${orderId} | no recipient email (order row missing or no valid email)`,
            );
          }
        }
      } else if (
        event.type === "checkout.session.expired" ||
        event.type === "checkout.session.async_payment_failed"
      ) {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderIdRaw = session.metadata?.orderId ?? "";
        const orderId = Number(orderIdRaw);
        if (Number.isInteger(orderId) && orderId > 0) {
          await dbPool.execute(
            "UPDATE order_requests SET payment_status = 'failed' WHERE id = ?",
            [orderId],
          );
        }
      }

      return res.json({ received: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed processing webhook.";
      return res.status(500).json({ status: "error", message });
    }
  },
);
app.use(express.json());

type MessageRow = {
  id: number;
  sender_type: "client" | "owner" | "assistant";
  content: string;
  created_at: string;
};

type ConversationRow = {
  id: number;
  client_email: string;
  source: string;
  updated_at: string;
  created_at: string;
};

type OrderRow = {
  id: number;
  name: string;
  email: string;
  preferred_domain_name: string | null;
  message: string | null;
  backup_domain_ideas: string | null;
  payment_plan: string;
  project_zip_path: string;
  payment_status: string;
  stripe_checkout_session_id: string | null;
  stripe_subscription_id: string | null;
  payment_currency: string;
  paid_at: string | null;
  created_at: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resolveCheckoutRecipientEmail(
  order: OrderRow | undefined,
  session: Stripe.Checkout.Session,
): string | null {
  if (order?.email && emailRegex.test(order.email)) {
    return order.email.toLowerCase();
  }
  const fromSession =
    session.customer_details?.email ??
    (typeof session.customer_email === "string" ? session.customer_email : null) ??
    (typeof session.metadata?.clientEmail === "string"
      ? session.metadata.clientEmail
      : null);
  if (fromSession && emailRegex.test(fromSession)) {
    return fromSession.toLowerCase();
  }
  return null;
}

/** BCC business inbox on order confirmations (avoid duplicate if same as customer). */
function orderConfirmationBcc(recipient: string): string | undefined {
  const notify =
    process.env.ORDER_NOTIFY_EMAIL?.trim() ||
    process.env.SMTP_FROM?.trim() ||
    "";
  if (!notify || !emailRegex.test(notify)) {
    return undefined;
  }
  const lower = notify.toLowerCase();
  if (lower === recipient.toLowerCase()) {
    return undefined;
  }
  return lower;
}

const adminPassword = process.env.ADMIN_PASSWORD ?? "";

function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (!adminPassword) {
    return res.status(503).json({
      status: "error",
      message: "Admin password is not configured on server.",
    });
  }

  const providedPassword = req.header("x-admin-password");
  if (!providedPassword || providedPassword !== adminPassword) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized.",
    });
  }

  return next();
}

function getStripePriceId(paymentPlan: string): string | null {
  const priceId = stripePlanPriceIds[paymentPlan];
  return priceId && priceId.trim() ? priceId.trim() : null;
}

function buildAssistantAnswer(questionRaw: string): string {
  const question = questionRaw.toLowerCase();
  let answer =
    "Thanks for your message. I will reply shortly with full details.";

  if (question.includes("price") || question.includes("cost")) {
    answer =
      "Hosting starts at $9.99/month. Full stack hosting starts at $19.99/month.";
  } else if (question.includes("time") || question.includes("how long")) {
    answer = "Most websites are launched in 1-2 days after receiving your files.";
  } else if (question.includes("domain")) {
    answer =
      "Yes, I can help you choose and set up a domain that matches your brand.";
  }

  return answer;
}

async function sendEmailToClient(
  toEmail: string,
  subject: string,
  bodyText: string,
  bodyHtml?: string,
  options?: { bcc?: string },
): Promise<{ sent: true } | { sent: false; reason: string }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? "no-reply@hosting.local";
  const portValue = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true";
  const passLength = pass ? pass.length : 0;

  console.log(
    `[SMTP] Preparing email | to=${toEmail}${options?.bcc ? ` | bcc=${options.bcc}` : ""} | subject="${subject}" | host=${host ?? "missing"} | port=${portValue} | secure=${secure} | user=${user ?? "missing"} | from=${from} | pass_set=${Boolean(pass)} | pass_len=${passLength}`,
  );

  if (!host || !user || !pass) {
    const reason = "SMTP is not configured on server.";
    console.log(`[SMTP] Skipping send | to=${toEmail} | reason=${reason}`);
    return { sent: false, reason };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: portValue,
    secure,
    auth: { user, pass },
  });

  try {
    console.log(`[SMTP] Calling transporter.sendMail | to=${toEmail}`);
    await transporter.sendMail({
      from,
      to: toEmail,
      bcc: options?.bcc,
      subject,
      text: bodyText,
      html: bodyHtml,
    });
    console.log(`[SMTP] Email sent successfully | to=${toEmail}`);
    return { sent: true };
  } catch (error) {
    const reason =
      error instanceof Error ? error.message : "Unknown SMTP send error.";
    console.error(`[SMTP] Failed sending email | to=${toEmail} | reason=${reason}`);
    if (error && typeof error === "object") {
      const smtpError = error as {
        code?: string;
        command?: string;
        response?: string;
        responseCode?: number;
      };
      console.error(
        `[SMTP] Error details | code=${smtpError.code ?? "n/a"} | command=${smtpError.command ?? "n/a"} | responseCode=${smtpError.responseCode ?? "n/a"} | response=${smtpError.response ?? "n/a"}`,
      );
    }
    return { sent: false, reason };
  }
}

function toHtmlParagraphs(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => `<p style="margin:0 0 12px 0;line-height:1.5;">${line}</p>`)
    .join("");
}

function renderEmailShell(title: string, bodyHtml: string): string {
  return `
<div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;">
    <h2 style="margin:0 0 16px 0;font-size:22px;color:#0f172a;">${title}</h2>
    ${bodyHtml}
    <p style="margin:20px 0 0 0;color:#64748b;font-size:12px;">Strelements</p>
  </div>
</div>`.trim();
}

function formatPlanLabel(paymentPlan: string): string {
  if (paymentPlan === "full-stack-19-99") {
    return "Full Stack Plan - $19.99/mo";
  }
  if (paymentPlan === "hosting-9-99") {
    return "Hosting Plan - $9.99/mo";
  }
  return paymentPlan;
}

function renderOrderConfirmationHtml(order: OrderRow): string {
  const planLabel = formatPlanLabel(order.payment_plan);
  const paidAtText = order.paid_at
    ? new Date(order.paid_at).toLocaleString("en-US")
    : "Just now";
  const domain = order.preferred_domain_name ?? "Not provided";
  const uploadedFile = path.basename(order.project_zip_path);

  return renderEmailShell(
    "Order confirmed",
    `
<p style="margin:0 0 12px 0;line-height:1.6;">Hi ${order.name}, your payment was successful and your order is now confirmed.</p>
<p style="margin:0 0 16px 0;line-height:1.6;">I will review your project and contact you shortly with next steps.</p>
<div style="border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;background:#f8fafc;">
  <p style="margin:0 0 8px 0;"><strong>Order ID:</strong> #${order.id}</p>
  <p style="margin:0 0 8px 0;"><strong>Plan:</strong> ${planLabel}</p>
  <p style="margin:0 0 8px 0;"><strong>Paid at:</strong> ${paidAtText}</p>
  <p style="margin:0 0 8px 0;"><strong>Preferred domain:</strong> ${domain}</p>
  <p style="margin:0;"><strong>Uploaded file:</strong> ${uploadedFile}</p>
</div>
<p style="margin:16px 0 0 0;line-height:1.6;">If any details are incorrect, reply to this email and I will update them.</p>
`.trim(),
  );
}

async function getOrCreateConversation(
  clientEmail: string,
  source = "chat_bubble",
): Promise<number> {
  const [existingRowsRaw] = await dbPool.execute(
    "SELECT id, client_email, source, created_at, updated_at FROM contact_conversations WHERE client_email = ? LIMIT 1",
    [clientEmail],
  );
  const existingRows = existingRowsRaw as ConversationRow[];
  const existingConversation = existingRows[0];
  if (existingConversation) {
    await dbPool.execute(
      "UPDATE contact_conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [existingConversation.id],
    );
    return existingConversation.id;
  }

  const [insertResult] = await dbPool.execute(
    "INSERT INTO contact_conversations (client_email, source) VALUES (?, ?)",
    [clientEmail, source],
  );
  const insertId = (insertResult as { insertId?: number }).insertId;
  if (!insertId) {
    throw new Error("Unable to create conversation.");
  }
  return insertId;
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "hosting-backend" });
});

app.get("/admin/test-email", requireAdmin, async (req, res) => {
  const to =
    typeof req.query.to === "string" && req.query.to.trim()
      ? req.query.to.trim()
      : process.env.SMTP_USER ?? "";

  if (!to) {
    return res.status(400).json({ status: "error", message: "No recipient." });
  }

  console.log(`[TEST-EMAIL] Sending test email to ${to}`);
  const result = await sendEmailToClient(
    to,
    "Test email from Strelements backend",
    "If you can read this, SMTP is working correctly.\n\nSent at: " +
      new Date().toISOString(),
    renderEmailShell(
      "SMTP test email",
      toHtmlParagraphs(
        `If you can read this, SMTP is working correctly.\nSent at: ${new Date().toISOString()}`,
      ),
    ),
  );

  if (result.sent) {
    return res.json({ status: "ok", message: `Test email sent to ${to}` });
  }
  return res.status(500).json({
    status: "error",
    message: `Failed to send test email to ${to}`,
    reason: result.reason,
  });
});

app.get("/db-health", async (_req, res) => {
  try {
    await checkDatabaseConnection();
    const [rows] = await dbPool.query("SELECT NOW() AS serverTime");
    res.json({ status: "ok", db: "connected", data: rows });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";
    res.status(500).json({ status: "error", db: "disconnected", message });
  }
});

app.post("/orders/upload", upload.single("projectUpload"), async (req, res) => {
  console.log(
    `[ORDERS_UPLOAD] Incoming upload | ip=${req.ip ?? "unknown"} | hasFile=${Boolean(req.file)}`,
  );
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "Please upload a ZIP file.",
    });
  }

  const uploadedFilePath = `/uploads/${req.file.filename}`;
  return res.json({
    status: "ok",
    uploadedFilePath,
    originalName: req.file.originalname,
  });
});

app.post("/orders", async (req, res) => {
  console.log(
    `[ORDERS] Incoming request | ip=${req.ip ?? "unknown"} | contentType=${req.headers["content-type"] ?? "unknown"}`,
  );
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const preferredDomainName =
    typeof req.body?.preferredDomainName === "string"
      ? req.body.preferredDomainName.trim()
      : "";
  const message =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";
  const backupDomainIdeas =
    typeof req.body?.backupDomainIdeas === "string"
      ? req.body.backupDomainIdeas.trim()
      : "";
  const paymentPlan =
    typeof req.body?.paymentPlan === "string" ? req.body.paymentPlan.trim() : "";
  const uploadedProjectPath =
    typeof req.body?.uploadedProjectPath === "string"
      ? req.body.uploadedProjectPath.trim()
      : "";
  console.log(
    `[ORDERS] Parsed payload | name_len=${name.length} | email=${email || "missing"} | paymentPlan=${paymentPlan || "missing"} | hasFile=${Boolean(req.file)} | uploadedProjectPath=${uploadedProjectPath || "missing"}`,
  );

  if (!name) {
    console.log("[ORDERS] Validation failed | reason=missing_name");
    return res.status(400).json({ status: "error", message: "Name is required." });
  }
  if (!emailRegex.test(email)) {
    console.log("[ORDERS] Validation failed | reason=invalid_email");
    return res.status(400).json({
      status: "error",
      message: "Valid email is required.",
    });
  }
  if (!paymentPlan) {
    console.log("[ORDERS] Validation failed | reason=missing_payment_plan");
    return res.status(400).json({
      status: "error",
      message: "Please choose a payment plan.",
    });
  }
  if (!uploadedProjectPath) {
    console.log("[ORDERS] Validation failed | reason=missing_zip_file");
    return res.status(400).json({
      status: "error",
      message: "Please upload a ZIP file.",
    });
  }
  if (!stripe) {
    return res.status(503).json({
      status: "error",
      message: "Stripe is not configured on server.",
    });
  }

  try {
    console.log("[ORDERS] Validation passed, saving order to DB");
    if (!uploadedProjectPath.startsWith("/uploads/")) {
      return res.status(400).json({
        status: "error",
        message: "Uploaded file path is invalid.",
      });
    }

    const resolvedFilePath = path.resolve(
      __dirname,
      "..",
      uploadedProjectPath.slice(1),
    );
    if (!resolvedFilePath.startsWith(uploadsDir)) {
      return res.status(400).json({
        status: "error",
        message: "Uploaded file path is outside uploads directory.",
      });
    }
    if (!fs.existsSync(resolvedFilePath)) {
      return res.status(400).json({
        status: "error",
        message: "Uploaded ZIP file was not found. Please upload it again.",
      });
    }

    const stripePriceId = getStripePriceId(paymentPlan);
    if (!stripePriceId) {
      return res.status(400).json({
        status: "error",
        message: "Stripe price is not configured for selected payment plan.",
      });
    }

    const [insertResult] = await dbPool.execute(
      `INSERT INTO order_requests
        (name, email, preferred_domain_name, message, backup_domain_ideas, payment_plan, project_zip_path, payment_status, stripe_price_id, payment_currency)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
      [
        name,
        email.toLowerCase(),
        preferredDomainName || null,
        message || null,
        backupDomainIdeas || null,
        paymentPlan,
        uploadedProjectPath,
        stripePriceId,
        stripeCurrency,
      ],
    );
    const orderId = (insertResult as { insertId?: number }).insertId;
    if (!orderId) {
      throw new Error("Failed to create order.");
    }
    console.log(
      `[ORDERS] DB insert ok | orderId=${orderId} | storedPath=${uploadedProjectPath}`,
    );

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email.toLowerCase(),
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url: `${appUrl}/order-sent?payment=success&order_id=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/order-sent?payment=cancelled`,
      metadata: {
        orderId: String(orderId),
        paymentPlan,
        clientEmail: email.toLowerCase(),
      },
    });

    await dbPool.execute(
      "UPDATE order_requests SET stripe_checkout_session_id = ? WHERE id = ?",
      [checkoutSession.id, orderId],
    );

    if (!checkoutSession.url) {
      return res.status(500).json({
        status: "error",
        message: "Stripe did not return a checkout URL.",
      });
    }

    console.log("[ORDERS] Returning 200 response");
    return res.json({
      status: "ok",
      message: "Order created. Continue to Stripe checkout.",
      checkoutUrl: checkoutSession.url,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save order.";
    console.error(`[ORDERS] Request failed | reason=${message}`);
    return res.status(500).json({ status: "error", message });
  }
});

app.get("/orders/confirmation-summary", async (req, res) => {
  const sessionIdRaw = req.query.session_id;
  const sessionId =
    typeof sessionIdRaw === "string" ? sessionIdRaw.trim() : "";
  const orderIdRaw = req.query.order_id;
  const orderIdParam =
    typeof orderIdRaw === "string" && /^\d+$/.test(orderIdRaw.trim())
      ? Number(orderIdRaw.trim())
      : null;

  if (!sessionId.startsWith("cs_") || sessionId.length < 14) {
    return res.status(400).json({
      status: "error",
      message: "Invalid checkout session id.",
    });
  }

  try {
    const [rowsRaw] = await dbPool.query(
      `SELECT
        id,
        name,
        email,
        preferred_domain_name,
        payment_plan,
        paid_at
      FROM order_requests
      WHERE stripe_checkout_session_id = ?
      LIMIT 1`,
      [sessionId],
    );
    const rows = rowsRaw as Pick<
      OrderRow,
      | "id"
      | "name"
      | "email"
      | "preferred_domain_name"
      | "payment_plan"
      | "paid_at"
    >[];
    const order = rows[0];
    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found for this session.",
      });
    }

    if (
      orderIdParam !== null &&
      Number.isInteger(orderIdParam) &&
      order.id !== orderIdParam
    ) {
      return res.status(404).json({
        status: "error",
        message: "Order does not match this checkout session.",
      });
    }

    return res.json({
      status: "ok",
      order: {
        id: order.id,
        name: order.name,
        email: order.email,
        preferredDomain: order.preferred_domain_name,
        paymentPlan: order.payment_plan,
        paidAt: order.paid_at,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load order.";
    console.error(`[ORDERS] confirmation-summary failed | reason=${message}`);
    return res.status(500).json({ status: "error", message });
  }
});

app.get("/admin/orders", requireAdmin, async (_req, res) => {
  try {
    const [rowsRaw] = await dbPool.query(
      `SELECT
        id,
        name,
        email,
        preferred_domain_name,
        message,
        backup_domain_ideas,
        payment_plan,
        project_zip_path,
        payment_status,
        stripe_checkout_session_id,
        stripe_subscription_id,
        payment_currency,
        paid_at,
        created_at
      FROM order_requests
      ORDER BY id DESC
      LIMIT 500`,
    );
    const rows = rowsRaw as OrderRow[];
    return res.json({ status: "ok", orders: rows });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch orders.";
    return res.status(500).json({ status: "error", message });
  }
});

app.get("/admin/orders/:orderId/download", requireAdmin, async (req, res) => {
  const orderId = Number(req.params.orderId);
  if (!Number.isInteger(orderId) || orderId < 1) {
    return res.status(400).json({
      status: "error",
      message: "Invalid order id.",
    });
  }

  try {
    const [rowsRaw] = await dbPool.execute(
      "SELECT id, project_zip_path FROM order_requests WHERE id = ? LIMIT 1",
      [orderId],
    );
    const rows = rowsRaw as Pick<OrderRow, "id" | "project_zip_path">[];
    const row = rows[0];

    if (!row) {
      return res.status(404).json({
        status: "error",
        message: "Order not found.",
      });
    }

    if (!row.project_zip_path.startsWith("/uploads/")) {
      return res.status(400).json({
        status: "error",
        message: "Stored file path is invalid.",
      });
    }

    const uploadsRoot = path.resolve(__dirname, "../uploads");
    const filePath = path.resolve(__dirname, "..", row.project_zip_path.slice(1));

    if (!filePath.startsWith(uploadsRoot)) {
      return res.status(400).json({
        status: "error",
        message: "Access outside uploads directory is not allowed.",
      });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        status: "error",
        message: "File not found on disk.",
      });
    }

    return res.download(filePath, path.basename(filePath));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to download file.";
    return res.status(500).json({ status: "error", message });
  }
});

app.get("/admin/storage", requireAdmin, async (_req, res) => {
  try {
    const stats = await fs.promises.statfs(uploadsDir);
    const totalBytes = stats.bsize * stats.blocks;
    const freeBytes = stats.bsize * stats.bavail;
    const usedBytes = totalBytes - freeBytes;

    return res.json({
      status: "ok",
      storage: {
        path: uploadsDir,
        totalBytes,
        usedBytes,
        freeBytes,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch storage stats.";
    return res.status(500).json({ status: "error", message });
  }
});

app.delete("/admin/orders/:orderId/upload", requireAdmin, async (req, res) => {
  const orderId = Number(req.params.orderId);
  if (!Number.isInteger(orderId) || orderId < 1) {
    return res.status(400).json({
      status: "error",
      message: "Invalid order id.",
    });
  }

  try {
    const [rowsRaw] = await dbPool.execute(
      "SELECT id, project_zip_path FROM order_requests WHERE id = ? LIMIT 1",
      [orderId],
    );
    const rows = rowsRaw as Pick<OrderRow, "id" | "project_zip_path">[];
    const row = rows[0];

    if (!row) {
      return res.status(404).json({
        status: "error",
        message: "Order not found.",
      });
    }
    if (!row.project_zip_path.startsWith("/uploads/")) {
      return res.status(400).json({
        status: "error",
        message: "Stored file path is invalid.",
      });
    }

    const uploadsRoot = path.resolve(__dirname, "../uploads");
    const filePath = path.resolve(__dirname, "..", row.project_zip_path.slice(1));
    if (!filePath.startsWith(uploadsRoot)) {
      return res.status(400).json({
        status: "error",
        message: "Access outside uploads directory is not allowed.",
      });
    }
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        status: "error",
        message: "File not found on disk.",
      });
    }

    await fs.promises.rm(filePath, { force: true });
    return res.json({
      status: "ok",
      message: "Project ZIP was deleted.",
      orderId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete project ZIP.";
    return res.status(500).json({ status: "error", message });
  }
});

app.post("/contact", async (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const subject = typeof req.body?.subject === "string" ? req.body.subject.trim() : "";
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!name) {
    return res.status(400).json({ status: "error", message: "Name is required." });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: "error",
      message: "Valid email is required.",
    });
  }
  if (!subject) {
    return res.status(400).json({ status: "error", message: "Subject is required." });
  }
  if (!message) {
    return res.status(400).json({ status: "error", message: "Message is required." });
  }

  const recipient = process.env.SMTP_FROM ?? "hello@strelements.com";
  const emailBodyText = [
    "New contact message from website",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
  ].join("\n");
  const emailBodyHtml = renderEmailShell(
    "New contact message from website",
    [
      `<p style="margin:0 0 12px 0;line-height:1.6;"><strong>Name:</strong> ${name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`,
      `<p style="margin:0 0 12px 0;line-height:1.6;"><strong>Email:</strong> ${email.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`,
      `<p style="margin:0 0 12px 0;line-height:1.6;"><strong>Subject:</strong> ${subject.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`,
      toHtmlParagraphs(`Message:\n${message}`),
    ].join(""),
  );

  const sendResult = await sendEmailToClient(
    recipient,
    `[Contact] ${subject}`,
    emailBodyText,
    emailBodyHtml,
  );

  if (!sendResult.sent) {
    return res.status(500).json({
      status: "error",
      message: `Failed to send message: ${sendResult.reason}`,
    });
  }

  return res.json({ status: "ok", message: "Message sent successfully." });
});

app.post("/ask", async (req, res) => {
  const emailRaw = req.body?.email;
  const questionRaw = req.body?.question;

  if (typeof emailRaw !== "string" || !emailRegex.test(emailRaw.trim())) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a valid email.",
    });
  }

  if (typeof questionRaw !== "string" || !questionRaw.trim()) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a question.",
    });
  }

  const clientEmail = emailRaw.trim().toLowerCase();
  const answer = buildAssistantAnswer(questionRaw);

  try {
    const conversationId = await getOrCreateConversation(clientEmail, "website");

    await dbPool.execute(
      "INSERT INTO contact_messages (conversation_id, sender_type, content) VALUES (?, 'client', ?)",
      [conversationId, questionRaw],
    );
    await dbPool.execute(
      "INSERT INTO contact_messages (conversation_id, sender_type, content) VALUES (?, 'assistant', ?)",
      [conversationId, answer],
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save message";
    return res.status(500).json({ status: "error", message });
  }

  return res.json({
    status: "ok",
    email: clientEmail,
    question: questionRaw,
    answer,
  });
});

app.get("/conversations", async (_req, res) => {
  try {
    const [rowsRaw] = await dbPool.query(
      "SELECT id, client_email, source, created_at, updated_at FROM contact_conversations ORDER BY updated_at DESC LIMIT 200",
    );
    const rows = rowsRaw as ConversationRow[];
    res.json({ status: "ok", conversations: rows });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch conversations";
    res.status(500).json({ status: "error", message });
  }
});

app.get("/conversations/:conversationId/messages", async (req, res) => {
  const conversationId = Number(req.params.conversationId);
  if (!Number.isInteger(conversationId) || conversationId < 1) {
    return res.status(400).json({
      status: "error",
      message: "Invalid conversation id.",
    });
  }

  try {
    const [rowsRaw] = await dbPool.execute(
      "SELECT id, sender_type, content, created_at FROM contact_messages WHERE conversation_id = ? ORDER BY id ASC",
      [conversationId],
    );
    const rows = rowsRaw as MessageRow[];
    return res.json({ status: "ok", messages: rows });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch messages";
    return res.status(500).json({ status: "error", message });
  }
});

app.get("/client-messages", async (req, res) => {
  const email = req.query.email;
  if (typeof email !== "string" || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      status: "error",
      message: "Provide a valid email query param.",
    });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const [conversationsRaw] = await dbPool.execute(
      "SELECT id, client_email, source, created_at, updated_at FROM contact_conversations WHERE client_email = ? LIMIT 1",
      [normalizedEmail],
    );
    const conversations = conversationsRaw as ConversationRow[];
    const conversation = conversations[0];
    if (!conversation) {
      return res.json({ status: "ok", messages: [] });
    }

    const [messagesRaw] = await dbPool.execute(
      "SELECT id, sender_type, content, created_at FROM contact_messages WHERE conversation_id = ? ORDER BY id ASC",
      [conversation.id],
    );
    const messages = messagesRaw as MessageRow[];
    return res.json({ status: "ok", conversationId: conversation.id, messages });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch client messages";
    return res.status(500).json({ status: "error", message });
  }
});

app.post("/conversations/:conversationId/reply", async (req, res) => {
  const conversationId = Number(req.params.conversationId);
  const contentRaw = req.body?.content;

  if (!Number.isInteger(conversationId) || conversationId < 1) {
    return res.status(400).json({
      status: "error",
      message: "Invalid conversation id.",
    });
  }
  if (typeof contentRaw !== "string" || !contentRaw.trim()) {
    return res.status(400).json({
      status: "error",
      message: "Reply cannot be empty.",
    });
  }

  try {
    const [conversationRowsRaw] = await dbPool.execute(
      "SELECT id, client_email, source, created_at, updated_at FROM contact_conversations WHERE id = ? LIMIT 1",
      [conversationId],
    );
    const conversationRows = conversationRowsRaw as ConversationRow[];
    const conversation = conversationRows[0];
    if (!conversation) {
      return res.status(404).json({
        status: "error",
        message: "Conversation not found.",
      });
    }

    await dbPool.execute(
      "INSERT INTO contact_messages (conversation_id, sender_type, content) VALUES (?, 'owner', ?)",
      [conversationId, contentRaw.trim()],
    );
    await dbPool.execute(
      "UPDATE contact_conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [conversationId],
    );

    try {
      await sendEmailToClient(
        conversation.client_email,
        "New reply about your hosting question",
        `Hi,\n\nI replied to your message:\n\n"${contentRaw.trim()}"\n\nYou can also continue chatting on the website.\n`,
        renderEmailShell(
          "New reply about your hosting question",
          toHtmlParagraphs(
            `Hi,\nI replied to your message:\n"${contentRaw.trim()}"\nYou can also continue chatting on the website.`,
          ),
        ),
      );
    } catch (emailError) {
      const message =
        emailError instanceof Error
          ? emailError.message
          : "Failed to send email notification";
      console.error(message);
    }

    return res.json({ status: "ok" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save reply";
    return res.status(500).json({ status: "error", message });
  }
});

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
    if (error instanceof Error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Unexpected server error.",
    });
  },
);

app.listen(port, () => {
  Promise.all([ensureMessagesTable(), ensureOrdersTable()])
    .then(() => {
      console.log("contact and order tables are ready");
    })
    .catch((error) => {
      const message =
        error instanceof Error ? error.message : "Unknown table init error";
      console.error(`Failed to prepare contact_messages table: ${message}`);
    });

  console.log(`Backend listening on http://localhost:${port}`);
});
