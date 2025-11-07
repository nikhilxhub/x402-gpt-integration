// Use the installed @prisma/client runtime which loads the generated client from node_modules
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

async function findApiKeyToModel(modelKey) {
  if (!modelKey) return null;

  let record = null;

  // Prisma client can expose models in different casings depending on generation.
  if (prismaClient.apiKey && typeof prismaClient.apiKey.findFirst === "function") {
    record = await prismaClient.apiKey.findFirst({ where: { ai_model: modelKey } });
  }
  else if (prismaClient.ApiKey && typeof prismaClient.ApiKey.findFirst === "function") {
    record = await prismaClient.ApiKey.findFirst({ where: { ai_model: modelKey } });
  }

  return record ?? null;
}

module.exports = {
  findApiKeyToModel,
  prismaClient,
};
