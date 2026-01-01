-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,
    "trace" TEXT,
    "stack" TEXT,
    "context" TEXT,
    "request" TEXT,
    "response" TEXT,
    "error" TEXT,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
