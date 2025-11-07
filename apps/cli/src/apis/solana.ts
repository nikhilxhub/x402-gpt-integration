import { clusterApiUrl, Connection } from "@solana/web3.js";
import { ENV } from "../config/env";


export const connection = new Connection(
  ENV.SOLANA_RPC_URL || clusterApiUrl("devnet"),
  "confirmed"
);