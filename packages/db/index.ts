import { PrismaClient } from "@prisma/client";
import { findApiKeyToModel } from "./src/services/apiService";

export { findApiKeyToModel };
export const prismaClient = new PrismaClient();