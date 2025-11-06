import { loadConfig, saveConfig } from "../config/config";
import { askModel } from "../prompt/askModel";
import { log } from "../utils/logger";


export async function changeModel() {
  const cfg = loadConfig();
  const selected = await askModel(cfg.modelKey);
  cfg.modelKey = selected;
  saveConfig(cfg);
  log.ok(`Model set to ${selected}`);
}