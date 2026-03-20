"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 4000);
app.use(express_1.default.json());
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
app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map