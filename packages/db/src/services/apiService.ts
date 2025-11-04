import { prismaClient } from ".";

export const findApiKeyToModel = async (modelKey:string) =>{


    if (!modelKey) return null;

  const record = await prismaClient.ApiKey.findFirst({
    where: { model_key: modelKey },
  });

  return record ?? null;
}