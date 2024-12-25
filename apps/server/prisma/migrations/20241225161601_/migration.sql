/*
  Warnings:

  - A unique constraint covering the columns `[ip]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ip` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "ip" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_ip_key" ON "sessions"("ip");
