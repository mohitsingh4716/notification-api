import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendWhatsappMsg = async (phoneNumber, message) => {
  try {
    const response = await axios({
      url: 'https://graph.facebook.com/v20.0/phone_number_id/messages',
      method: 'post',
      headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
      },
      data: JSON.stringify({
          messaging_product: 'whatsapp',
          to: 'phone_number',
          type: 'text',
          text:{
              body: 'Hello Mohit this is a test message'
          }
      })
  });
    console.log("WhatsApp Notification Sent Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("WhatsApp Notification Failed:", error.response?.data || error.message);
    throw error;
  }
};
