-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "checkin_date" TIMESTAMP(3) NOT NULL,
    "checkout_date" TIMESTAMP(3) NOT NULL,
    "item_type" TEXT NOT NULL,
    "item_details" TEXT NOT NULL,
    "customer_contact" TEXT NOT NULL,
    "partner_contact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
