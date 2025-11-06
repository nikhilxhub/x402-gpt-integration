import dotenv from "dotenv";
dotenv.config();


export const ENV: {
  SOLANA_RPC_URL: string;
  BACKEND_URL: string;
} = {

    SOLANA_RPC_URL: process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com",

    BACKEND_URL: "https://localhost:3000",

    // DEFAULT_MODEL: "gemini-2.5-pro",


}