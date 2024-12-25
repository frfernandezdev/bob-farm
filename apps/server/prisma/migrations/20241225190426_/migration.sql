/*
  Warnings:

  - You are about to drop the column `client_id` on the `purchases` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_client_id_fkey";

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "client_id",
ADD COLUMN     "user_id" BIGINT;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
