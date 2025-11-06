import { Keypair } from "@solana/web3.js";

import { walletPath as defaultWalletPath } from "../utils/paths";
import { readFileSync } from "node:fs";
import { StoredWallet } from "../types/StoredWallet";
export function loadWallet(path = defaultWalletPath()):Keypair {

    const json = JSON.parse(readFileSync(path, "utf-8")) as StoredWallet;

    const secretKey = new Uint8Array(Buffer.from(json.secretKeyBase64, "base64"));
    return Keypair.fromSecretKey(secretKey);
    
}