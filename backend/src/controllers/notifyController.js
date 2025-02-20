import prisma from "../../utils/client.js";
import { sendemailUsingNodeMailer } from "../services/sendemail.js";

import { bookingValidation } from "../validation/bookingValidation.js";

export const sendNotification = async (req, res) => {
    try {
        const body= req.body;

        const {success}= bookingValidation.safeParse(body);

        if(!success){
            return res.status(411).json({message: 'Invalid Input data'});
        }

        const {name, email ,checkin_date, checkout_date, item_type, item_details, phone ,amount}= body;

        const notification = await prisma.notification.create({
            data: {
                customer_name:name,
                customer_email:email,
                booking_date: new Date(),
                checkin_date: new Date(checkin_date),
                checkout_date: new Date(checkout_date),
                item_type,
                item_details,
                customer_contact:phone,
                amount:parseInt(amount, 10)
            }
        });

        const recipientEmail= [
            {email:process.env.ADMIN_EMAIL},
            {email:process.env.PARTNER_EMAIL},
            {email:email}

        ]

        await Promise.all(
            recipientEmail.map(({email})=>{
                sendemailUsingNodeMailer(notification, email)
            }
            )
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
