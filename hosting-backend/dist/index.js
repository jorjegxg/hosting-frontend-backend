"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 4000);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/ask", (_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
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
app.options("/ask", (_req, res) => {
    return res.sendStatus(204);
});
app.post("/ask", async (req, res) => {
    const questionRaw = req.body?.question;
    if (typeof questionRaw !== "string" || !questionRaw.trim()) {
        return res.status(400).json({
            status: "error",
            message: "Please provide a question.",
        });
    }
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
    try {
        await db_1.dbPool.execute("INSERT INTO contact_messages (source, question, answer) VALUES (?, ?, ?)", ["chat_bubble", questionRaw, answer]);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save message";
        return res.status(500).json({ status: "error", message });
    }
    return res.json({
        status: "ok",
        question: questionRaw,
        answer,
    });
});
app.get("/messages", async (_req, res) => {
    try {
        const [rows] = await db_1.dbPool.query("SELECT id, source, question, answer, created_at FROM contact_messages ORDER BY id DESC LIMIT 100");
        res.json({ status: "ok", messages: rows });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch messages";
        res.status(500).json({ status: "error", message });
    }
});
app.listen(port, () => {
    (0, db_1.ensureMessagesTable)()
        .then(() => {
        console.log("contact_messages table is ready");
    })
        .catch((error) => {
        const message = error instanceof Error ? error.message : "Unknown table init error";
        console.error(`Failed to prepare contact_messages table: ${message}`);
    });
    console.log(`Backend listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map