import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

// Always load environment variables from the repo root `.env`,
// regardless of where `npm run dev` is executed from.
const rootEnvPath = path.resolve(__dirname, "../../.env");
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath, override: true });
} else {
  dotenv.config(); // fallback to local `.env` if root is missing
}

export const dbPool = mysql.createPool({
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

export async function checkDatabaseConnection(): Promise<void> {
  const connection = await dbPool.getConnection();
  try {
    await connection.ping();
  } finally {
    connection.release();
  }
}

export async function ensureMessagesTable(): Promise<void> {
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS contact_conversations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      client_email VARCHAR(255) NOT NULL UNIQUE,
      source VARCHAR(50) NOT NULL DEFAULT 'chat_bubble',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await dbPool.query(`
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
