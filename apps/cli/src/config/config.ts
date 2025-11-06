import { ConfigShape } from "../types/type";
import { ENV } from "./env";
import { configPath, walletPath as defaultWalletPath,appDir } from "../utils/paths";
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { ModelKey } from "../types/ModelKey";
import { ClusterKey } from "../types/ClusterKey";

const DEFAULT_CONFIG:ConfigShape ={
    backendUrl: ENV.BACKEND_URL,
    modelKey: "gpt-3.5-turbo",
    cluster: "devnet",
    walletPath: defaultWalletPath()
}
export function saveConfig(cfg: ConfigShape){
    writeFileSync(configPath(), JSON.stringify(cfg, null, 2));


}

export function loadConfig():ConfigShape {

    if(!existsSync(configPath())){
        saveConfig(DEFAULT_CONFIG);
        return DEFAULT_CONFIG;
    }
    const data = readFileSync(configPath(), "utf-8");
    const parsed = JSON.parse(data) as ConfigShape;

    appDir();
    return {
        ...DEFAULT_CONFIG,
        ...parsed
    };

}

export function setModel(modelKey: ModelKey) {
  const cfg = loadConfig();
  cfg.modelKey = modelKey;
  saveConfig(cfg);
}

export function setCluster(cluster: ClusterKey) {
  const cfg = loadConfig();
  cfg.cluster = cluster;
  saveConfig(cfg);
}