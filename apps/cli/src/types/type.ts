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



