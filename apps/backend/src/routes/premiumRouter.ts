import { Request, Response, Router } from "express";
import { validatePremiumBody } from "../middleware/requestValidation";

import { findApiKeyToModel } from "@repo/db/client";

import { createPaymentRequest } from "../services/paymentService";
import { verifyAndSendSignedTransaction } from "../services/verifyAndSendSignedTransaction";
import { callModel_Api } from "../services/aiService";
export const premiumRouter: Router = Router();

premiumRouter.post(
  "/",
  validatePremiumBody,
  async (req: Request, res: Response) => {
    try {
      const { model, prompt } = req.body;

      if (!prompt) {
        return res.status(404).json({
          error: "prompt required",
        });
      }

      // bring api-key

      const apiKeyEntry = await findApiKeyToModel(model);

      if (!apiKeyEntry) {
        return res.status(404).json({ error: "model/api key not found" });
      }

      const receiver = apiKeyEntry.owner_sol;
      const rateLamports = apiKeyEntry.rate_per_request;
      const aiModel = apiKeyEntry.ai_model;
      const api_key = apiKeyEntry.api_key;

      // check for signed transaction header
      const signedTxBase64 = (req.headers["x402-signed-tx"] as string) || null;

      if (!signedTxBase64) {
        const paymentRequest = createPaymentRequest({
          receiver,
          amountLamports: rateLamports,
          memo: `payment for model:${aiModel}`,
          expiresInSec: 300,
        });

        return res.status(402).json({
          message: "Payment required",
          paymentRequest,
        });
      }

      const verifyResult = await verifyAndSendSignedTransaction({
        signedTxBase64,
        expectedReceiver: receiver,
        expectedAmountLamports: rateLamports,
      });

      if (!verifyResult.success) {
        return res
          .status(400)
          .json({
            error: "payment verification failed",
            details: verifyResult.reason,
          });
      }

      // Payment successful on-chain — now call the LLM via vercel ai
      console.log("sending call to model...");
      
      const aiResponse = await callModel_Api({
        model: aiModel,
        prompt,
        api_key

      });

      // Log / store usage if desired (omitted for brevity)

      return res.json({
        paidTxSignature: verifyResult.signature,
        ai: aiResponse,
      });

      
    } catch (err) {
      console.error("premiumHandler error", err);
      return res
        .status(500)
        .json({ error: "internal_error", details: (err as any).message });
    }
  }
);

// export const premiumHandler = async (req: Request, res: Response) => {
//   try {
//     const { prompt, modelKey } = req.body;
//     if (!prompt) return res.status(400).json({ error: "prompt required" });
//     // get model entry from DB (modelKey could be API key or id)
//     const apiKeyEntry = await prisma.apiKey.findFirst({
//       where: modelKey ? { api_key: modelKey } : undefined,
//     });

//     if (!apiKeyEntry) {
//       return res.status(404).json({ error: "model/api key not found" });
//     }

//     const receiver = apiKeyEntry.owner_sol;
//     const rateLamports = apiKeyEntry.rate_per_request;
//     const aiModel = apiKeyEntry.ai_model;

//     // check for signed transaction header
//     const signedTxBase64 = (req.headers["x402-signed-tx"] as string) || null;

//     if (!signedTxBase64) {
//       // Respond with payment request details (CLI will create + sign tx)
//       const paymentRequest = paymentService.createPaymentRequest({
//         receiver,
//         amountLamports: rateLamports,
//         memo: `payment for model:${apiKeyEntry.api_key}`,
//         expiresInSec: 300
//       });
//       // 402 Payment Required is one option; using 200 with a flag for easier CLI handling
//       return res.status(402).json({
//         message: "Payment required",
//         paymentRequest
//       });
//     }

//     // If signed transaction included — verify & broadcast
//     const verifyResult = await paymentService.verifyAndSendSignedTransaction({
//       signedTxBase64,
//       expectedReceiver: receiver,
//       expectedAmountLamports: rateLamports
//     });

//     if (!verifyResult.success) {
//       return res.status(400).json({ error: "payment verification failed", details: verifyResult.reason });
//     }

//     // Payment successful on-chain — now call the LLM via vercel ai
//     const aiResponse = await aiService.callCompletion({
//       model: aiModel,
//       prompt
//     });

//     // Log / store usage if desired (omitted for brevity)

//     return res.json({
//       paidTxSignature: verifyResult.txSignature,
//       ai: aiResponse
//     });

//   } catch (err) {
//     console.error("premiumHandler error", err);
//     return res.status(500).json({ error: "internal_error", details: (err as any).message });
//   }
// };
