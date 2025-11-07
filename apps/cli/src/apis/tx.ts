import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export async function buildAndSignTransferTx(params: {
  connection: Connection;
  from: Keypair;
  to: string;
  lamports: number;
  memo?: string;
}) {
  const toPubkey = new PublicKey(params.to);
  const { blockhash, lastValidBlockHeight } =
    await params.connection.getLatestBlockhash("finalized");

  const ix = SystemProgram.transfer({
    fromPubkey: params.from.publicKey,
    toPubkey,
    lamports: params.lamports,
  });

  const tx = new Transaction({
    blockhash: blockhash,
    lastValidBlockHeight: lastValidBlockHeight,
    feePayer: params.from.publicKey,
  }).add(ix);
  
  tx.sign(params.from);
  const raw = tx.serialize();
  return { raw, lastValidBlockHeight };


}
export function serializeTxBase64(raw: Buffer) {
  return raw.toString("base64");
}
