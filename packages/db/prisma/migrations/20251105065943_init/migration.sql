-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "owner_sol" TEXT NOT NULL,
    "rate_per_request" INTEGER NOT NULL,
    "ai_model" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_api_key_key" ON "ApiKey"("api_key");
