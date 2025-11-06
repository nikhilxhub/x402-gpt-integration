import { Keypair } from "@solana/web3.js";
import { ClusterKey } from "./ClusterKey";
import { ModelKey } from "./ModelKey";


export interface ConfigShape {
    backendUrl: string;
    modelKey: ModelKey;
    cluster: ClusterKey;
    walletPath: string;
}

export interface PaymentRequest{
    receiver:string,
    amountLamports: number,
    memo?:string,
    expiresAt?:string,
    note?:string
}

export interface PremiumResponseOK {
    paidTxSignature : string,
    ai: string
}



export interface userPrompt {
    modelKey: string;
    cluster: "devnet" | "mainnet-beta";
    wallet: Keypair;
    prompt: string;
}