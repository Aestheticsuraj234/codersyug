"use server";
import { createTransport, Transporter } from "nodemailer";

export const sendMail = async (email: string, name: string, uniqueCode: string) => {
  console.log(email, name, uniqueCode);

  const transportOptions = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT), // Make sure to convert the port value to a number
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  const transport: Transporter = createTransport(transportOptions);

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Quiz Registration Successful",
    html: `
      <html>
        <body>
          <h1>Hello👋 ${name},</h1>
          <p>You are successfully registered for the Quiz-Wuiz.</p>
          <p>Your Unique Code is <pre><code>${uniqueCode}</code></pre>.</p>
          <p>Use this code to login to the quiz.</p>
          <p> Join our WhatsApp Group for more updates: <a href="https://chat.whatsapp.com/FSRSe9N8jte5TqZ8aR0QeF">Join</a></p>
          <p>Thank you👑.</p>
        </body>
      </html>
    `,
  };

  await transport.sendMail(mailOptions);
};
