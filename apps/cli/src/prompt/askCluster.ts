import inquirer from "inquirer";
import { ClusterKey } from "../types/ClusterKey";

export async function askCluster(current: ClusterKey) {
  const { cluster } = await inquirer.prompt<{ cluster: ClusterKey }>([
    {
      type: "list",
      name: "cluster",
      message: "Select Solana cluster:",
      default: current,
      choices: [
        { name: "Devnet", value: "devnet" },
        // { name: "Mainnet Beta", value: "mainnet-beta" }
      ]
    }
  ]);
  return cluster;
}