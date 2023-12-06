/*
  Warnings:

  - You are about to drop the column `Active` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "Active",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
