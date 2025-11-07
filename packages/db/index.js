const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

async function findApiKeyToModel(modelKey) {
  if (!modelKey) return null;

  const record = await prismaClient.apiKey.findFirst
    ? await prismaClient.apiKey.findFirst({ where: { ai_model: modelKey } })
    : // fallback in case Prisma client uses PascalCase model name
      await prismaClient.ApiKey.findFirst({ where: { ai_model: modelKey } });

  return record ?? null;
}

module.exports = {
  findApiKeyToModel,
  prismaClient,
};
