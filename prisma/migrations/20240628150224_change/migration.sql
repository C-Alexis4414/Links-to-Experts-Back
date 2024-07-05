/*
  Warnings:

  - The primary key for the `Subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Subscription` table. All the data in the column will be lost.
  - The `subscriptionId` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_pkey",
DROP COLUMN "id",
DROP COLUMN "subscriptionId",
ADD COLUMN     "subscriptionId" INTEGER[],
ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY ("userId");
