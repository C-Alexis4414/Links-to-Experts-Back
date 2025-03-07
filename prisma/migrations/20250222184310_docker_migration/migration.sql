/*
  Warnings:

  - You are about to drop the `AccessToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccessToken" DROP CONSTRAINT "AccessToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Liked" DROP CONSTRAINT "Liked_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Liked" DROP CONSTRAINT "Liked_userId_fkey";

-- DropForeignKey
ALTER TABLE "Professional" DROP CONSTRAINT "Professional_userId_fkey";

-- DropForeignKey
ALTER TABLE "Youtuber" DROP CONSTRAINT "Youtuber_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" VARCHAR(300),
ADD COLUMN     "hashRefreshToken" VARCHAR(300),
ADD COLUMN     "refreshExpiresAt" TIMESTAMP(3),
ALTER COLUMN "is_Professional" SET DEFAULT false,
ALTER COLUMN "is_Youtuber" SET DEFAULT false;

-- DropTable
DROP TABLE "AccessToken";

-- CreateTable
CREATE TABLE "LikedTag" (
    "userId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "LikedTag_pkey" PRIMARY KEY ("userId","tagId")
);

-- CreateTable
CREATE TABLE "Access" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "ipAdress" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Access_userId_key" ON "Access"("userId");

-- AddForeignKey
ALTER TABLE "Liked" ADD CONSTRAINT "Liked_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liked" ADD CONSTRAINT "Liked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedTag" ADD CONSTRAINT "LikedTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedTag" ADD CONSTRAINT "LikedTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Youtuber" ADD CONSTRAINT "Youtuber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professional" ADD CONSTRAINT "Professional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
