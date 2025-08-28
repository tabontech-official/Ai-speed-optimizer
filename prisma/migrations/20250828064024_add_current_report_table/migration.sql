-- CreateTable
CREATE TABLE "CurrentReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storeUrl" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrentReport_storeUrl_key" ON "CurrentReport"("storeUrl");
