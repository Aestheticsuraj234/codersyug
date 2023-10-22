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
          <p>You are successfully registered for the quiz.</p>
          <p>Your Unique Code is <pre><code>${uniqueCode}</code></pre>.</p>
        </body>
      </html>
    `,
  };

  await transport.sendMail(mailOptions);
};
