import axios from "axios";
import { ENV } from "../config/env";
import { PaymentRequest, PremiumResponseOK, userPrompt } from "../types/type";
import { log } from "../utils/logger";
import { connection } from "./solana";
import { buildAndSignTransferTx, serializeTxBase64 } from "./tx";

export async function sendPremiumPrompt(opts:userPrompt) {
    


    const url = `${ENV.BACKEND_URL}/premium`;

    try{
        // withour header..
        const r1 =await axios.post(url,{
            prompt: opts.prompt,
            model: opts.modelKey
        },{
            validateStatus:()=> true
        });

        if(r1.status == 200){
            return r1.data as PremiumResponseOK
        }
        // log.info(`API Response 1 Status: ${r1.status}`);
        // log.info(`API Response 1 Data: ${JSON.stringify(r1.data)}`);

        if(r1.status == 402 && r1.data?.paymentRequest){
            const  pr  = r1.data.paymentRequest as PaymentRequest;


            log.info(`Payment requested: ${pr.amountLamports} lamports to ${pr.receiver}`);

            const { raw } = await buildAndSignTransferTx({
                connection,
                from:opts.wallet,
                to: pr.receiver,
                lamports: pr.amountLamports,
                memo: pr.memo

            });
            
            const signedBase64 = serializeTxBase64(raw);
            
            const r2 = await axios.post(
                url,
                { prompt: opts.prompt, model: opts.modelKey },
                {
                    headers: { "x402-signed-tx": signedBase64 },
                    validateStatus: () => true
                }
            );
            
            if (r2.status === 200) {

                return r2.data as PremiumResponseOK;
            } else {
                throw new Error(`Payment/LLM failed: ${r2.status} ${JSON.stringify(r2.data)}`);
            }

        }
        throw new Error(`Unexpected status: ${r1.status} ${JSON.stringify(r1.data)}`);


    }catch(err: any){
        throw new Error(`SendPremiumPrompt error: ${err.message}`);

    }

    
}