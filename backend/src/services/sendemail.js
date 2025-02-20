import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';
dotenv.config();

export const sendemailUsingNodeMailer = async (bookingDetails, email) => {

    const {customer_name, booking_id, booking_date, checkin_date, checkout_date, item_type, item_details, customer_contact, partner_contact}= bookingDetails;

    const booking_date_formatted = formatDate(booking_date);
    const checkin_date_formatted = formatDate(checkin_date);
    const checkout_date_formatted = formatDate(checkout_date);

    const config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    };

    const transporter = nodemailer.createTransport(config);



    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: "Teesta Travel",
            link: 'https://teesta.travel/'
        }
    });

    const emailtemplate = {
        body: {
            name: customer_name,
            intro: [`Thank you for using Teesta Travel online facility. We are pleased to inform you that your booking ${booking_id} is confirmed.`,
                     "Your booking details are indicated below." ],
            table: {
                data: [
                    { key: 'Booking Date', value: booking_date_formatted },
                    { key: 'Check-in', value: checkin_date_formatted },
                    { key: 'Check-out', value: checkout_date_formatted },
                    
                    { key: 'Item Type', value: item_type },
                    { key: 'Item Details', value: item_details },
                    { key: 'Customer Contact', value: customer_contact },
                    { key: 'Amount', value: "₹50000" }
                ],
                columns: {
                    customWidth: {
                        key: '30%',
                        value: '70%'
                    }
                }
            },
            outro: "Sincerely awaiting your visit"
        }
    };

    const emailHtml = mailGenerator.generate(emailtemplate);
    

    let mailOptions = {
        from: `"Teesta Travel" <${process.env.EMAIL}>`, 
        to:email,   
        subject: `Booking Confirmation on Teesta Travel ,  ${checkin_date_formatted} to ${checkout_date_formatted}`,    
        html: emailHtml,
    };
    
    transporter.sendMail(mailOptions,  (err, data)=> {
        if (err) {
            console.log('Error sending email', err);
        } else {
            console.log('Email sent successfully');
        }  
    });
};

const formatDate = (date) =>{
    return new Date(date)
        .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        .replace(/ /g, '-');
}