import { ErrorBoundary } from "../error/index.js";
import ProductReviews from "../models/review.js";

export const createProductReview = async (req, res, next) => {
  const payload = req.body;
  try {
    const review = await ProductReviews.insertMany(payload);
    res.status(201).json({
      success: true,
      data: review,
      message: "Product review added successfully",
    });
  } catch {
    next(new ErrorBoundary("Unable to add review", 500));
  }
};

export const getProductReviews = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reviews = await ProductReviews.find({ product: { $in: [id] } });
    res.status(200).json({
      success: true,
      data: reviews,
      message: "Product reviews fetched successfully",
    });
  } catch {
    next(new ErrorBoundary("Unable to fetch product reviews", 500));
  }
};
