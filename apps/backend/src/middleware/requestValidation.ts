import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const premiumBody = z.object({
  prompt: z.string().min(1, "Prompt required"),
  model: z.string().min(1, "Model required")
});

export function validatePremiumBody(req: Request, res: Response, next: NextFunction) {
  const parsed = premiumBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(", ") });
  }
  next();
}
