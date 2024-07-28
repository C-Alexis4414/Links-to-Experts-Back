/*
  Warnings:

  - The primary key for the `Youtuber` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `YoutuberId` on the `Youtuber` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Professional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Youtuber` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "tagsId" INTEGER[];

-- AlterTable
ALTER TABLE "Youtuber" DROP CONSTRAINT "Youtuber_pkey",
DROP COLUMN "YoutuberId",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "tagChannel" SET DEFAULT '@',
ADD CONSTRAINT "Youtuber_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_userId_key" ON "Professional"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Youtuber_userId_key" ON "Youtuber"("userId");
