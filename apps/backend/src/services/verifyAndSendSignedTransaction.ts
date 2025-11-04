import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";
dotenv.config();

export async function verifyAndSendSignedTransaction(params: {
  signedTxBase64: string;
  expectedReceiver: string;
  expectedAmountLamports: number;
}) {

    
 
}