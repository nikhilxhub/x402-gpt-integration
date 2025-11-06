import { homedir } from "node:os";
import { join } from "node:path";
import { mkdirSync, existsSync } from "node:fs";

const ROOT_DIR = join(homedir(), ".x402");

export function ensureAppDir() {
  if (!existsSync(ROOT_DIR)) mkdirSync(ROOT_DIR, { recursive: true });
}

export function appDir() {
  ensureAppDir();
  return ROOT_DIR;
}

export function configPath() {
  return join(appDir(), "config.json");
}

export function walletPath() {
  return join(appDir(), "walletx.json");
}
