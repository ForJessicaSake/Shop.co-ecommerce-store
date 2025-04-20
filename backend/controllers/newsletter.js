import { ErrorBoundary } from "../error/index.js";
import NewsLetter from "../models/newsletter.js";
import { sendMail } from "./services/mail/index.js";
export const subscribeToNewsLetter = async (req, res, next) => {
  const { email } = req.body;
  try {
    await sendMail({
      recipient: email,
      subject: "Welcome to our newsletter",
      mail: `<h4>Thanks for subscribing to our newsletter!</h4>
      <p>We're excited to have you on board. 🎉</p>
      <p>From now on, you'll be the first to know about our latest updates, exclusive offers, and curated content — straight to your inbox.</p>
      <p>If you ever have any questions or feedback, we’re just an email away.</p>
      <p>Welcome again — we're glad you're here!</p>
      <p>Best regards,<br>Team Shop.co</p>`,
    });
    const newsLetter = await NewsLetter.create({ email });
    res.status(201).json({
      success: true,
      data: newsLetter,
      message: "Subscribed to newsletter successfully",
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to subscribe to newsletter", 500));
  }
};
