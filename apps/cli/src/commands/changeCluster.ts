
import { loadConfig, saveConfig } from "../config/config.js";
import { askCluster } from "../prompt/askCluster.js";
import { log } from "../utils/logger.js";

export async function changeCluster() {
  const cfg = loadConfig();
  const selected = await askCluster(cfg.cluster);
  cfg.cluster = selected;
  saveConfig(cfg);
  log.ok(`Cluster set to ${selected}`);
}
