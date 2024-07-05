/*
  Warnings:

  - You are about to drop the column `Is_Professional` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Is_Youtuber` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[urlLinkedin]` on the table `Professional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Is_Professional",
DROP COLUMN "Is_Youtuber",
ADD COLUMN     "is_Professional" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_Youtuber" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Youtuber" ALTER COLUMN "tagChannel" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_urlLinkedin_key" ON "Professional"("urlLinkedin");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
