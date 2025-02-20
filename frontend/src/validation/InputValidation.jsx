
import { z } from "zod";



export const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),

    checkin_date: z.string().min(1, "Check-in date is required"),
    checkout_date: z.string().min(1, "Check-out date is required"),
    item_type: z.string().min(1, "Item type is required"),
    item_details: z.string().min(1, "Item details are required"),

    amount: z.string().min(1, "Amount must be greater than 0"),
  });