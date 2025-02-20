import z from 'zod';

export const bookingValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  checkin_date: z.string().date(),
  checkout_date: z.string().date(),   
  item_type : z.string(),       
  item_details: z.string(),     
  amount: z.string(),
});