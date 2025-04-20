import { ErrorBoundary } from "../../../error/index.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendMail = async ({ recipient, subject, mail }) => {
  try {
    await transporter.sendMail({
      from: '"Shop.co" <noreply@shopco.com>',
      to: recipient,
      subject: subject,
      html: mail,
    });
  } catch (error) {
    new ErrorBoundary("Unable to send mail", 500);
  }
};
