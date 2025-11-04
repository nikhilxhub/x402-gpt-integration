import { prismaClient } from "..";

export const findApiKeyToModel = async (modelKey:string) =>{

    // return  await prismaClient.apiKey.findFirst({
    //   where: modelKey ? { api_key: modelKey } : undefined,
    // });

    if (!modelKey) return null;

  const record = await prismaClient.apiKey.findFirst({
    where: { model_key: modelKey },
  });

  return record ?? null;
}