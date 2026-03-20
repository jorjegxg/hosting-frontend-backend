"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
exports.checkDatabaseConnection = checkDatabaseConnection;
exports.ensureMessagesTable = ensureMessagesTable;
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = __importDefault(require("mysql2/promise"));
dotenv_1.default.config();
exports.dbPool = promise_1.default.createPool({
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "mysecretpassword",
    database: process.env.DB_NAME ?? "myappdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
async function checkDatabaseConnection() {
    const connection = await exports.dbPool.getConnection();
    try {
        await connection.ping();
    }
    finally {
        connection.release();
    }
}
async function ensureMessagesTable() {
    await exports.dbPool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      source VARCHAR(50) NOT NULL DEFAULT 'chat_bubble',
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
//# sourceMappingURL=db.js.map