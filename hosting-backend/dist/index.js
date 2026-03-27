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
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 4000);
const uploadsDir = node_path_1.default.resolve(__dirname, "../uploads");
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
async function sendEmailToClient(toEmail, subject, bodyText) {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM ?? "no-reply@hosting.local";
    const portValue = Number(process.env.SMTP_PORT ?? 587);
    const secure = process.env.SMTP_SECURE === "true";
    if (!host || !user || !pass) {
        console.log(`SMTP not configured. Skipping email to ${toEmail}. Subject: ${subject}`);
        return;
    }
    const transporter = nodemailer_1.default.createTransport({
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
app.post("/orders", upload.single("projectUpload"), async (req, res) => {
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
    if (!name) {
        return res.status(400).json({ status: "error", message: "Name is required." });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: "error",
            message: "Valid email is required.",
        });
    }
    if (!paymentPlan) {
        return res.status(400).json({
            status: "error",
            message: "Please choose a payment plan.",
        });
    }
    if (!req.file) {
        return res.status(400).json({
            status: "error",
            message: "Please upload a ZIP file.",
        });
    }
    try {
        const storedPath = `/uploads/${req.file.filename}`;
        await db_1.dbPool.execute(`INSERT INTO order_requests
        (name, email, preferred_domain_name, message, backup_domain_ideas, payment_plan, project_zip_path)
       VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            name,
            email.toLowerCase(),
            preferredDomainName || null,
            message || null,
            backupDomainIdeas || null,
            paymentPlan,
            storedPath,
        ]);
        return res.json({
            status: "ok",
            message: "Order received successfully.",
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save order.";
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
            await sendEmailToClient(conversation.client_email, "New reply about your hosting question", `Hi,\n\nI replied to your message:\n\n"${contentRaw.trim()}"\n\nYou can also continue chatting on the website.\n`);
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