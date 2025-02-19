import axios from "axios";

export const sendEmail = async (recipientEmail, recipientName = "User") => {
  const body = {
    recipients: [
      {
        to: [
          { email: recipientEmail }
        ],
        "variables": {
          "company_name":"Mohit Ltd",
          "otp":"3232"
        }
      }
    ],
    from: {
      name: "Teesta",
      email: process.env.MSG91_SENDER_EMAIL
    },
    domain: process.env.MSG91_DOMAIN,
    reply_to: [
      {
      email: "aditya@teesta.travel",
      },
      {
      email: "support@teesta.travel",
      },
      ],
    template_id: process.env.MSG91_EMAIL_TEMPLATE_ID,
  };

  const options = {
    method: "POST",
    url: "https://control.msg91.com/api/v5/email/send",
    headers: {
      accept: "application/json",
      authkey: process.env.MSG91_EMAIL_AUTH_KEY,
      "content-type": "application/JSON",
    },
    data: body,
  };

  try {
    const { data } = await axios.request(options);
    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

