/*
  Warnings:

  - You are about to drop the column `dateLastUpdatedDate` on the `Income` table. All the data in the column will be lost.
  - Added the required column `dateLastUpdated` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "dateLastUpdatedDate",
ADD COLUMN     "dateLastUpdated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;
