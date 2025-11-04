import { PrismaClient } from "@prisma/client";
import { findApiKeyToModel } from "./services/apiService";

export { findApiKeyToModel };
export const prismaClient = new PrismaClient();