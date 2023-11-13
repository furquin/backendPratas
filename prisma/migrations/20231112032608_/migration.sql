/*
  Warnings:

  - You are about to alter the column `price` on the `order_products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(16,2)`.
  - Added the required column `totalPrice` to the `order_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_products" ADD COLUMN     "totalPrice" DECIMAL(16,2) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(16,2);
