/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `stores` will be added. If there are existing duplicate values, this will fail.
  - Made the column `storeId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_storeId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "roleId" DROP DEFAULT,
ALTER COLUMN "storeId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "stores_name_key" ON "stores"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
