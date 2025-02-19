import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';
dotenv.config();

export const sendemailUsingNodeMailer = async (bookingDetails) => {

    const {customer_name, booking_id, booking_date, checkin_date, checkout_date, item_type, item_details, customer_contact, partner_contact}= bookingDetails;


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
            intro: `Thank you for using Teesta Travel online facility.We are pleased to inform you that your booking ${booking_id} is confirmed. \n\n Your booking details are indicated below.`,
            table: {
                data: [
                    { key: 'Check-in', value: checkin_date },
                    { key: 'Check-out', value: checkout_date },
                    { key: 'Booking Date', value: booking_date },
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
            outro: `Sincerely awaiting your visit,\n\n Teesta Travel`
        }
    };

    const emailHtml = mailGenerator.generate(emailtemplate);
    

    let mailOptions = {
        from: `"Mohit Kumar" <${process.env.EMAIL}>`,  
        to:"mohitsingh4716@gmail.com",
        subject: `Booking Confirmation on Teesta Travel at ${checkin_date}`,    
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