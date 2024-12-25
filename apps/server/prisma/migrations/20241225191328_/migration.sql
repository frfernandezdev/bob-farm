/*
  Warnings:

  - Made the column `purchase_time` on table `purchases` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `purchases` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_user_id_fkey";

-- AlterTable
ALTER TABLE "purchases" ALTER COLUMN "purchase_time" SET NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
