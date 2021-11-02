/*
  Warnings:

  - Added the required column `paymentType` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subType` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "paymentType" TEXT NOT NULL,
ADD COLUMN     "subType" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
