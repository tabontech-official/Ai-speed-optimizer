-- CreateTable
CREATE TABLE "OptimizedReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storeUrl" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OptimizedReport_storeUrl_key" ON "OptimizedReport"("storeUrl");
