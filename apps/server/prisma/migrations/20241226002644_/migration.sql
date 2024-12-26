/*
  Warnings:

  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_ownerId_fkey";

-- DropIndex
DROP INDEX "sessions_ip_key";

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "tokens";
