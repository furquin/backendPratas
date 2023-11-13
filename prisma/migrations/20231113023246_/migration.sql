/*
  Warnings:

  - You are about to drop the column `status` on the `order_products` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `order_products` table. All the data in the column will be lost.
  - Added the required column `totalPriceProduct` to the `order_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPriceOrder` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_orderId_fkey";

-- AlterTable
ALTER TABLE "order_products" DROP COLUMN "status",
DROP COLUMN "totalPrice",
ADD COLUMN     "totalPriceProduct" DECIMAL(16,2) NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "installment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "installmentsNumber" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "totalPriceOrder" DECIMAL(16,2) NOT NULL;

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "price" DECIMAL(16,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
