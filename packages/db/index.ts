// import { PrismaClient } from "@prisma/client";
// import { findApiKeyToModel } from "./services/apiService";

import { PrismaClient } from "./src/generated/prisma/client";

// export { findApiKeyToModel };

export const findApiKeyToModel = async (modelKey: string) => {
  if (!modelKey) return null;

  const record = await prismaClient.apiKey.findFirst({
    where: { ai_model: modelKey },
  });

  return record ?? null;
};

export const prismaClient = new PrismaClient();