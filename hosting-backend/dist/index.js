"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const multer_1 = __importDefault(require("multer"));
const db_1 = require("./db");
const nodemailer_1 = __importDefault(require("nodemailer"));
const stripe_1 = __importDefault(require("stripe"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 4000);
const uploadsDir = node_path_1.default.resolve(__dirname, "../uploads");
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? "";
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
const stripeCurrency = "usd";
const stripePlanPriceIds = {
    "hosting-9-99": process.env.STRIPE_PRICE_HOSTING_9_99_MONTHLY,
    "full-stack-19-99": process.env.STRIPE_PRICE_FULL_STACK_19_99_MONTHLY,
};
const stripe = stripeSecretKey
    ? new stripe_1.default(stripeSecretKey, {
        apiVersion: "2026-03-25.dahlia",
    })
    : null;
if (!node_fs_1.default.existsSync(uploadsDir)) {
    node_fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
        const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
        cb(null, `${Date.now()}-${safeName}`);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const isZip = file.mimetype === "application/zip" ||
            file.mimetype === "application/x-zip-compressed" ||
            file.originalname.toLowerCase().endsWith(".zip");
        if (!isZip) {
            cb(new Error("Only ZIP files are allowed."));
            return;
        }
        cb(null, true);
    },
});
app.use((0, cors_1.default)());
app.post("/stripe/webhook", express_1.default.raw({ type: "application/json" }), async (req, res) => {
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
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature, stripeWebhookSecret);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Invalid Stripe signature.";
        return res.status(400).json({
            status: "error",
            message,
        });
    }
    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const orderIdRaw = session.metadata?.orderId ?? "";
            const orderId = Number(orderIdRaw);
            if (Number.isInteger(orderId) && orderId > 0) {
                await db_1.dbPool.execute(`UPDATE order_requests
             SET payment_status = 'paid',
                 paid_at = CURRENT_TIMESTAMP,
                 stripe_customer_id = ?,
                 stripe_subscription_id = ?,
                 stripe_checkout_session_id = ?
             WHERE id = ?`, [
                    typeof session.customer === "string" ? session.customer : null,
                    typeof session.subscription === "string" ? session.subscription : null,
                    session.id,
                    orderId,
                ]);
                const clientEmail = session.customer_details?.email;
                if (clientEmail && emailRegex.test(clientEmail)) {
                    const [orderRowsRaw] = await db_1.dbPool.execute(`SELECT
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
               LIMIT 1`, [orderId]);
                    const orderRows = orderRowsRaw;
                    const order = orderRows[0];
                    const plainTextBody = order
                        ? `Hi ${order.name},\n\nYour payment was successful and your order is now confirmed.\n\nOrder ID: #${order.id}\nPlan: ${formatPlanLabel(order.payment_plan)}\nPreferred domain: ${order.preferred_domain_name ?? "Not provided"}\nUploaded file: ${node_path_1.default.basename(order.project_zip_path)}\n\nI will review your project and contact you shortly.\n\nThanks,\nStrelements`
                        : "Your subscription payment was received successfully. I will now continue with your order setup.";
                    await sendEmailToClient(clientEmail.toLowerCase(), "Order confirmed - Strelements", plainTextBody, order
                        ? renderOrderConfirmationHtml(order)
                        : renderEmailShell("Payment received", toHtmlParagraphs("Your subscription payment was received successfully.\nI will now continue with your order setup.")));
                }
            }
        }
        else if (event.type === "checkout.session.expired" ||
            event.type === "checkout.session.async_payment_failed") {
            const session = event.data.object;
            const orderIdRaw = session.metadata?.orderId ?? "";
            const orderId = Number(orderIdRaw);
            if (Number.isInteger(orderId) && orderId > 0) {
                await db_1.dbPool.execute("UPDATE order_requests SET payment_status = 'failed' WHERE id = ?", [orderId]);
            }
        }
        return res.json({ received: true });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed processing webhook.";
        return res.status(500).json({ status: "error", message });
    }
});
app.use(express_1.default.json());
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const adminPassword = process.env.ADMIN_PASSWORD ?? "";
function requireAdmin(req, res, next) {
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
function getStripePriceId(paymentPlan) {
    const priceId = stripePlanPriceIds[paymentPlan];
    return priceId && priceId.trim() ? priceId.trim() : null;
}
function buildAssistantAnswer(questionRaw) {
    const question = questionRaw.toLowerCase();
    let answer = "Thanks for your message. I will reply shortly with full details.";
    if (question.includes("price") || question.includes("cost")) {
        answer =
            "Hosting starts at $9.99/month. Full stack hosting starts at $19.99/month.";
    }
    else if (question.includes("time") || question.includes("how long")) {
        answer = "Most websites are launched in 1-2 days after receiving your files.";
    }
    else if (question.includes("domain")) {
        answer =
            "Yes, I can help you choose and set up a domain that matches your brand.";
    }
    return answer;
}
async function sendEmailToClient(toEmail, subject, bodyText, bodyHtml) {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM ?? "no-reply@hosting.local";
    const portValue = Number(process.env.SMTP_PORT ?? 587);
    const secure = process.env.SMTP_SECURE === "true";
    const passLength = pass ? pass.length : 0;
    console.log(`[SMTP] Preparing email | to=${toEmail} | subject="${subject}" | host=${host ?? "missing"} | port=${portValue} | secure=${secure} | user=${user ?? "missing"} | from=${from} | pass_set=${Boolean(pass)} | pass_len=${passLength}`);
    if (!host || !user || !pass) {
        const reason = "SMTP is not configured on server.";
        console.log(`[SMTP] Skipping send | to=${toEmail} | reason=${reason}`);
        return { sent: false, reason };
    }
    const transporter = nodemailer_1.default.createTransport({
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
            subject,
            text: bodyText,
            html: bodyHtml,
        });
        console.log(`[SMTP] Email sent successfully | to=${toEmail}`);
        return { sent: true };
    }
    catch (error) {
        const reason = error instanceof Error ? error.message : "Unknown SMTP send error.";
        console.error(`[SMTP] Failed sending email | to=${toEmail} | reason=${reason}`);
        if (error && typeof error === "object") {
            const smtpError = error;
            console.error(`[SMTP] Error details | code=${smtpError.code ?? "n/a"} | command=${smtpError.command ?? "n/a"} | responseCode=${smtpError.responseCode ?? "n/a"} | response=${smtpError.response ?? "n/a"}`);
        }
        return { sent: false, reason };
    }
}
function toHtmlParagraphs(text) {
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
function renderEmailShell(title, bodyHtml) {
    return `
<div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;">
    <h2 style="margin:0 0 16px 0;font-size:22px;color:#0f172a;">${title}</h2>
    ${bodyHtml}
    <p style="margin:20px 0 0 0;color:#64748b;font-size:12px;">Strelements</p>
  </div>
</div>`.trim();
}
function formatPlanLabel(paymentPlan) {
    if (paymentPlan === "full-stack-19-99") {
        return "Full Stack Plan - $19.99/mo";
    }
    if (paymentPlan === "hosting-9-99") {
        return "Hosting Plan - $9.99/mo";
    }
    return paymentPlan;
}
function renderOrderConfirmationHtml(order) {
    const planLabel = formatPlanLabel(order.payment_plan);
    const paidAtText = order.paid_at
        ? new Date(order.paid_at).toLocaleString("en-US")
        : "Just now";
    const domain = order.preferred_domain_name ?? "Not provided";
    const uploadedFile = node_path_1.default.basename(order.project_zip_path);
    return renderEmailShell("Order confirmed", `
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
`.trim());
}
async function getOrCreateConversation(clientEmail, source = "chat_bubble") {
    const [existingRowsRaw] = await db_1.dbPool.execute("SELECT id, client_email, source, created_at, updated_at FROM contact_conversations WHERE client_email = ? LIMIT 1", [clientEmail]);
    const existingRows = existingRowsRaw;
    const existingConversation = existingRows[0];
    if (existingConversation) {
        await db_1.dbPool.execute("UPDATE contact_conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", [existingConversation.id]);
        return existingConversation.id;
    }
    const [insertResult] = await db_1.dbPool.execute("INSERT INTO contact_conversations (client_email, source) VALUES (?, ?)", [clientEmail, source]);
    const insertId = insertResult.insertId;
    if (!insertId) {
        throw new Error("Unable to create conversation.");
    }
    return insertId;
}
app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "hosting-backend" });
});
app.get("/admin/test-email", requireAdmin, async (req, res) => {
    const to = typeof req.query.to === "string" && req.query.to.trim()
        ? req.query.to.trim()
        : process.env.SMTP_USER ?? "";
    if (!to) {
        return res.status(400).json({ status: "error", message: "No recipient." });
    }
    console.log(`[TEST-EMAIL] Sending test email to ${to}`);
    const result = await sendEmailToClient(to, "Test email from Strelements backend", "If you can read this, SMTP is working correctly.\n\nSent at: " +
        new Date().toISOString(), renderEmailShell("SMTP test email", toHtmlParagraphs(`If you can read this, SMTP is working correctly.\nSent at: ${new Date().toISOString()}`)));
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
        await (0, db_1.checkDatabaseConnection)();
        const [rows] = await db_1.dbPool.query("SELECT NOW() AS serverTime");
        res.json({ status: "ok", db: "connected", data: rows });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown database error";
        res.status(500).json({ status: "error", db: "disconnected", message });
    }
});
app.post("/orders/upload", upload.single("projectUpload"), async (req, res) => {
    console.log(`[ORDERS_UPLOAD] Incoming upload | ip=${req.ip ?? "unknown"} | hasFile=${Boolean(req.file)}`);
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
    console.log(`[ORDERS] Incoming request | ip=${req.ip ?? "unknown"} | contentType=${req.headers["content-type"] ?? "unknown"}`);
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
    const preferredDomainName = typeof req.body?.preferredDomainName === "string"
        ? req.body.preferredDomainName.trim()
        : "";
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
    const backupDomainIdeas = typeof req.body?.backupDomainIdeas === "string"
        ? req.body.backupDomainIdeas.trim()
        : "";
    const paymentPlan = typeof req.body?.paymentPlan === "string" ? req.body.paymentPlan.trim() : "";
    const uploadedProjectPath = typeof req.body?.uploadedProjectPath === "string"
        ? req.body.uploadedProjectPath.trim()
        : "";
    console.log(`[ORDERS] Parsed payload | name_len=${name.length} | email=${email || "missing"} | paymentPlan=${paymentPlan || "missing"} | hasFile=${Boolean(req.file)} | uploadedProjectPath=${uploadedProjectPath || "missing"}`);
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
        const resolvedFilePath = node_path_1.default.resolve(__dirname, "..", uploadedProjectPath.slice(1));
        if (!resolvedFilePath.startsWith(uploadsDir)) {
            return res.status(400).json({
                status: "error",
                message: "Uploaded file path is outside uploads directory.",
            });
        }
        if (!node_fs_1.default.existsSync(resolvedFilePath)) {
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
        const [insertResult] = await db_1.dbPool.execute(`INSERT INTO order_requests
        (name, email, preferred_domain_name, message, backup_domain_ideas, payment_plan, project_zip_path, payment_status, stripe_price_id, payment_currency)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`, [
            name,
            email.toLowerCase(),
            preferredDomainName || null,
            message || null,
            backupDomainIdeas || null,
            paymentPlan,
            uploadedProjectPath,
            stripePriceId,
            stripeCurrency,
        ]);
        const orderId = insertResult.insertId;
        if (!orderId) {
            throw new Error("Failed to create order.");
        }
        console.log(`[ORDERS] DB insert ok | orderId=${orderId} | storedPath=${uploadedProjectPath}`);
        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer_email: email.toLowerCase(),
            line_items: [{ price: stripePriceId, quantity: 1 }],
            success_url: `${appUrl}/order-sent?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/order-sent?payment=cancelled`,
            metadata: {
                orderId: String(orderId),
                paymentPlan,
                clientEmail: email.toLowerCase(),
            },
        });
        await db_1.dbPool.execute("UPDATE order_requests SET stripe_checkout_session_id = ? WHERE id = ?", [checkoutSession.id, orderId]);
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
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save order.";
        console.error(`[ORDERS] Request failed | reason=${message}`);
        return res.status(500).json({ status: "error", message });
    }
});
app.get("/admin/orders", requireAdmin, async (_req, res) => {
    try {
        const [rowsRaw] = await db_1.dbPool.query(`SELECT
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
      LIMIT 500`);
        const rows = rowsRaw;
        return res.json({ status: "ok", orders: rows });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch orders.";
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
        const [rowsRaw] = await db_1.dbPool.execute("SELECT id, project_zip_path FROM order_requests WHERE id = ? LIMIT 1", [orderId]);
        const rows = rowsRaw;
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
        const uploadsRoot = node_path_1.default.resolve(__dirname, "../uploads");
        const filePath = node_path_1.default.resolve(__dirname, "..", row.project_zip_path.slice(1));
        if (!filePath.startsWith(uploadsRoot)) {
            return res.status(400).json({
                status: "error",
                message: "Access outside uploads directory is not allowed.",
            });
        }
        if (!node_fs_1.default.existsSync(filePath)) {
            return res.status(404).json({
                status: "error",
                message: "File not found on disk.",
            });
        }
        return res.download(filePath, node_path_1.default.basename(filePath));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to download file.";
        return res.status(500).json({ status: "error", message });
    }
});
app.get("/admin/storage", requireAdmin, async (_req, res) => {
    try {
        const stats = await node_fs_1.default.promises.statfs(uploadsDir);
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
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch storage stats.";
        return res.status(500).json({ status: "error", message });
    }
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
        await db_1.dbPool.execute("INSERT INTO contact_messages (conversation_id, sender_type, content) VALUES (?, 'client', ?)", [conversationId, questionRaw]);
        await db_1.dbPool.execute("INSERT INTO contact_messages (conversation_id, sender_type, content) VALUES (?, 'assistant', ?)", [conversationId, answer]);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save message";
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
        const [rowsRaw] = await db_1.dbPool.query("SELECT id, client_email, source, created_at, updated_at FROM contact_conversations ORDER BY updated_at DESC LIMIT 200");
        const rows = rowsRaw;
        res.json({ status: "ok", conversations: rows });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch conversations";
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
        const [rowsRaw] = await db_1.dbPool.execute("SELECT id, sender_type, content, created_at FROM contact_messages WHERE conversation_id = ? ORDER BY id ASC", [conversationId]);
        const rows = rowsRaw;
        return res.json({ status: "ok", messages: rows });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch messages";
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
        const [conversationsRaw] = await db_1.dbPool.execute("SELECT id, client_email, source, created_at, updated_at FROM contact_conversations WHERE client_email = ? LIMIT 1", [normalizedEmail]);
        const conversations = conversationsRaw;
        const conversation = conversations[0];
        if (!conversation) {
            return res.json({ status: "ok", messages: [] });
        }
        const [messagesRaw] = await db_1.dbPool.execute("SELECT id, sender_type, content, created_at FROM contact_messages WHERE conversation_id = ? ORDER BY id ASC", [conversation.id]);
        const messages = messagesRaw;
        return res.json({ status: "ok", conversationId: conversation.id, messages });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch client messages";
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
        const [conversationRowsRaw] = await db_1.dbPool.execute("SELECT id, client_email, source, created_at, updated_at FROM contact_conversations WHERE id = ? LIMIT 1", [conversationId]);
        const conversationRows = conversationRowsRaw;
        const conversation = conversationRows[0];
        if (!conversation) {
            return res.status(404).json({
                status: "error",
                message: "Conversation not found.",
            });
        }
        await db_1.dbPool.execute("INSERT INTO contact_messages (conversation_id, sender_type, content) VALUES (?, 'owner', ?)", [conversationId, contentRaw.trim()]);
        await db_1.dbPool.execute("UPDATE contact_conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", [conversationId]);
        try {
            await sendEmailToClient(conversation.client_email, "New reply about your hosting question", `Hi,\n\nI replied to your message:\n\n"${contentRaw.trim()}"\n\nYou can also continue chatting on the website.\n`, renderEmailShell("New reply about your hosting question", toHtmlParagraphs(`Hi,\nI replied to your message:\n"${contentRaw.trim()}"\nYou can also continue chatting on the website.`)));
        }
        catch (emailError) {
            const message = emailError instanceof Error
                ? emailError.message
                : "Failed to send email notification";
            console.error(message);
        }
        return res.json({ status: "ok" });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save reply";
        return res.status(500).json({ status: "error", message });
    }
});
app.use((error, _req, res, _next) => {
    if (error instanceof multer_1.default.MulterError) {
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
});
app.listen(port, () => {
    Promise.all([(0, db_1.ensureMessagesTable)(), (0, db_1.ensureOrdersTable)()])
        .then(() => {
        console.log("contact and order tables are ready");
    })
        .catch((error) => {
        const message = error instanceof Error ? error.message : "Unknown table init error";
        console.error(`Failed to prepare contact_messages table: ${message}`);
    });
    console.log(`Backend listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map