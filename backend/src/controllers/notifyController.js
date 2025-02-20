import prisma from "../../utils/client.js";
import { sendemailUsingNodeMailer } from "../services/sendemail.js";

// import { sendWhatsappMsg } from "../services/whatsapp.js";

import { bookingValidation } from "../validation/bookingValidation.js";

export const sendNotification = async (req, res) => {
    try {
        const body= req.body;

        const {success}= bookingValidation.safeParse(body);

        if(!success){
            return res.status(411).json({message: 'Invalid Input data'});
        }

        const {customer_name, booking_id, booking_date, checkin_date, checkout_date, item_type, item_details, customer_contact, partner_contact}= body;

        const notification = await prisma.notification.create({
            data: {
                customer_name,
                booking_id,
                booking_date: new Date(booking_date),
                checkin_date: new Date(checkin_date),
                checkout_date: new Date(checkout_date),
                item_type,
                item_details,
                customer_contact,
                partner_contact
            }
        });

        // const message = `Hello ${customer_name},\n\n  Congratulations!  \n\nYour booking (ID: ${booking_id}) is confirmed.\n\n🔹 Check-in: ${checkin_date}\n🔹 Check-out: ${checkout_date}\n🔹 Item: ${item_type}\n\nThank you for choosing us!`;

        // await sendWhatsappMsg("+917091010921", message);

        const recipientEmail= [
            {email:process.env.ADMIN_EMAIL},
            {email:process.env.PARTNER_EMAIL},
            {email:"shivamkumarsingh2214@gmail.com"}

        ]

        await Promise.all(
            recipientEmail.map(({email})=>{
                sendemailUsingNodeMailer(notification, email);
            })
        )


      

        return res.status(200).json({
            status: 'success',
            message: 'Notification captured successfully',
            data: notification,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
        
    }
}
