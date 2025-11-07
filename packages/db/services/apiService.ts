// import { prismaClient } from ".";

import { prismaClient } from "..";

// import { prismaClient } from ".";

export const findApiKeyToModel = async (modelKey: string) => {
  if (!modelKey) return null;

  const record = await prismaClient.ApiKey.findFirst({
    where: { ai_model: modelKey },
  });

  return record ?? null;
};
