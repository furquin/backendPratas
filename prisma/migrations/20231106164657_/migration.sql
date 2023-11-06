/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "roles_slug_key" ON "roles"("slug");
