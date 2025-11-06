
import { Keypair } from "@solana/web3.js";
import { walletPath as defaultWalletPath } from "../utils/paths";
import { saveWallet } from "./createWallet";

export function importWalletFromString(secret: string, path = defaultWalletPath()):Keypair {
    let bytes:Uint8Array | null = null;

    try{
        const arr = JSON.parse(secret) as number[];
        if(Array.isArray(arr)){
            bytes = new Uint8Array(arr);

        }


    }catch{

    }

    if(!bytes){

        // try base 64

        try{
            const buf = Buffer.from(secret,"base64");

            if(buf.length > 0){
                bytes = new Uint8Array(buf);
            }
            
        }catch{

        }
    }

    if(!bytes){
        throw new Error("Unsupportedsecret format.Paste the secret key JSON array or base64.")
    }

    const kp = Keypair.fromSecretKey(bytes);
    saveWallet(kp, path);

    return kp;

}