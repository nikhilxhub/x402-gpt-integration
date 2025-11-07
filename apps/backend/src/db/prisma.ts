import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export const findApiKeyToModel = async (modelKey: string) => {
  if (!modelKey) return null;

  const record = await prisma.apiKey.findFirst({
    where: { ai_model: modelKey },
  });

  return record ?? null;
};