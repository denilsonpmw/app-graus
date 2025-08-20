-- CreateTable
CREATE TABLE "AffiliateLink" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "customSlug" TEXT,
    "productId" TEXT,
    "campaignName" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "clicksCount" INTEGER NOT NULL DEFAULT 0,
    "conversionsCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "expiresAt" TIMESTAMP,

    CONSTRAINT "AffiliateLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkClick" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referer" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "sessionId" TEXT,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "conversionValue" DECIMAL(10,2),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateLink_affiliateId_customSlug_key" ON "AffiliateLink"("affiliateId", "customSlug");

-- CreateIndex
CREATE INDEX "AffiliateLink_affiliateId_idx" ON "AffiliateLink"("affiliateId");

-- CreateIndex
CREATE INDEX "AffiliateLink_customSlug_idx" ON "AffiliateLink"("customSlug");

-- CreateIndex
CREATE INDEX "LinkClick_affiliateId_idx" ON "LinkClick"("affiliateId");

-- CreateIndex
CREATE INDEX "LinkClick_linkId_idx" ON "LinkClick"("linkId");

-- CreateIndex
CREATE INDEX "LinkClick_sessionId_idx" ON "LinkClick"("sessionId");

-- AddForeignKey
ALTER TABLE "AffiliateLink" ADD CONSTRAINT "AffiliateLink_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkClick" ADD CONSTRAINT "LinkClick_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "AffiliateLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkClick" ADD CONSTRAINT "LinkClick_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
