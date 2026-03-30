import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

function loadRootEnvFile() {
  const rootEnvPath = path.resolve(process.cwd(), "..", ".env");
  if (!fs.existsSync(rootEnvPath)) return;

  const envContent = fs.readFileSync(rootEnvPath, "utf8");
  for (const rawLine of envContent.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const equalIndex = line.indexOf("=");
    if (equalIndex <= 0) continue;

    const key = line.slice(0, equalIndex).trim();
    let value = line.slice(equalIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Root .env must be the source of truth, so we always override.
    process.env[key] = value;
  }
}

loadRootEnvFile();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
