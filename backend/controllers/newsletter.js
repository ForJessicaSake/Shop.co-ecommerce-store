import { ErrorBoundary } from "../error/index.js";
import NewsLetter from "../models/newsletter.js";
export const subscribeToNewsLetter = async (req, res, next) => {
  const { email } = req.body;
  try {
    const newsLetter = await NewsLetter.insertMany({ email });
    res.status(201).json({
      success: true,
      data: newsLetter,
      message: "Subscribed to newsletter successfully",
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to subscribe to newsletter", 500));
  }
};
