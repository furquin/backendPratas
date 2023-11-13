/*
  Warnings:

  - You are about to drop the column `paymentId` on the `order_products` table. All the data in the column will be lost.
  - Added the required column `paymentId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_paymentId_fkey";

-- AlterTable
ALTER TABLE "order_products" DROP COLUMN "paymentId",
ADD COLUMN     "paymentMethodId" INTEGER;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE SET NULL ON UPDATE CASCADE;
