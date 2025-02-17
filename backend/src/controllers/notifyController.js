import prisma from "../../utils/client.js";
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
