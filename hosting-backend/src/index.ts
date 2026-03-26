import express from "express";
import cors from "cors";
import { checkDatabaseConnection, dbPool, ensureMessagesTable } from "./db";
import nodemailer from "nodemailer";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? "no-reply@hosting.local";
  const portValue = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true";

  if (!host || !user || !pass) {
    console.log(
      `SMTP not configured. Skipping email to ${toEmail}. Subject: ${subject}`,
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: portValue,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: toEmail,
    subject,
    text: bodyText,
  });
}

async function getOrCreateConversation(
  clientEmail: string,
  source = "chat_bubble",
): Promise<number> {
  const [existingRows] = await dbPool.execute<ConversationRow[]>(
    "SELECT id, client_email, source, created_at, updated_at FROM contact_conversations WHERE client_email = ? LIMIT 1",
    [clientEmail],
  );
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
    const [rows] = await dbPool.query<ConversationRow[]>(
      "SELECT id, client_email, source, created_at, updated_at FROM contact_conversations ORDER BY updated_at DESC LIMIT 200",
    );
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
    const [rows] = await dbPool.execute<MessageRow[]>(
      "SELECT id, sender_type, content, created_at FROM contact_messages WHERE conversation_id = ? ORDER BY id ASC",
      [conversationId],
    );
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
    const [conversations] = await dbPool.execute<ConversationRow[]>(
      "SELECT id, client_email, source, created_at, updated_at FROM contact_conversations WHERE client_email = ? LIMIT 1",
      [normalizedEmail],
    );
    const conversation = conversations[0];
    if (!conversation) {
      return res.json({ status: "ok", messages: [] });
    }

    const [messages] = await dbPool.execute<MessageRow[]>(
      "SELECT id, sender_type, content, created_at FROM contact_messages WHERE conversation_id = ? ORDER BY id ASC",
      [conversation.id],
    );
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
    const [conversationRows] = await dbPool.execute<ConversationRow[]>(
      "SELECT id, client_email, source, created_at, updated_at FROM contact_conversations WHERE id = ? LIMIT 1",
      [conversationId],
    );
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

app.listen(port, () => {
  ensureMessagesTable()
    .then(() => {
      console.log("contact_messages table is ready");
    })
    .catch((error) => {
      const message =
        error instanceof Error ? error.message : "Unknown table init error";
      console.error(`Failed to prepare contact_messages table: ${message}`);
    });

  console.log(`Backend listening on http://localhost:${port}`);
});
