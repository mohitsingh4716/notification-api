import z from 'zod';

export const bookingValidation = z.object({

  customer_name: z.string(),
  booking_id: z.string(),     
  booking_date: z.string().date(),     
  checkin_date: z.string().date(),
  checkout_date: z.string().date(),   
  item_type : z.string(),       
  item_details: z.string(),     
  customer_contact: z.string(),
  partner_contact: z.string(),

});