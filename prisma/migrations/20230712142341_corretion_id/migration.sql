/*
  Warnings:

  - You are about to drop the column `bar_code` on the `products` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[barCode]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barCode` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_bar_code_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "bar_code",
ADD COLUMN     "barCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_barCode_key" ON "products"("barCode");
