import { Keypair } from "@solana/web3.js";
import { walletPath as defaultWalletPath } from "../utils/paths";
import { StoredWallet } from "../types/StoredWallet";
import { writeFileSync } from "node:fs";


export function createWallet(path = defaultWalletPath()): Keypair{

    const kp = Keypair.generate();
    saveWallet(kp, path);

    return kp;
}

export function saveWallet(kp: Keypair, path = defaultWalletPath()){


    const obj:StoredWallet = {

        secretKeyBase64: Buffer.from(kp.secretKey).toString("base64"),
        publicKey: kp.publicKey.toBase58()
    };

    writeFileSync(path, JSON.stringify(obj, null,2), "utf8");

}