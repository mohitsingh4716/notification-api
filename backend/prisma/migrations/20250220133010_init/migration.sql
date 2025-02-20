/*
  Warnings:

  - You are about to drop the column `booking_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `partner_contact` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `customer_email` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "booking_id",
DROP COLUMN "partner_contact",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "customer_email" TEXT NOT NULL;
