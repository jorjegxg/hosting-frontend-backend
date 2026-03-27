"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
exports.checkDatabaseConnection = checkDatabaseConnection;
exports.ensureMessagesTable = ensureMessagesTable;
exports.ensureOrdersTable = ensureOrdersTable;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = __importDefault(require("mysql2/promise"));
// Always load environment variables from the repo root `.env`,
// regardless of where `npm run dev` is executed from.
const rootEnvPath = node_path_1.default.resolve(__dirname, "../../.env");
if (node_fs_1.default.existsSync(rootEnvPath)) {
    dotenv_1.default.config({ path: rootEnvPath, override: true });
}
else {
    dotenv_1.default.config(); // fallback to local `.env` if root is missing
}
exports.dbPool = promise_1.default.createPool({
    host: process.env.DB_HOST ?? "127.0.0.1",
    // Docker maps host `DB_PORT` -> container 3306 (see root `docker-compose.yml`)
    port: Number(process.env.DB_PORT ?? 3308),
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
    CREATE TABLE IF NOT EXISTS contact_conversations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      client_email VARCHAR(255) NOT NULL UNIQUE,
      source VARCHAR(50) NOT NULL DEFAULT 'chat_bubble',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
    await exports.dbPool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      conversation_id INT NOT NULL,
      sender_type ENUM('client', 'owner', 'assistant') NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES contact_conversations(id) ON DELETE CASCADE
    )
  `);
}
async function ensureOrdersTable() {
    await exports.dbPool.query(`
    CREATE TABLE IF NOT EXISTS order_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      preferred_domain_name VARCHAR(255) NULL,
      message TEXT NULL,
      backup_domain_ideas TEXT NULL,
      payment_plan VARCHAR(100) NOT NULL,
      project_zip_path VARCHAR(500) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
//# sourceMappingURL=db.js.map