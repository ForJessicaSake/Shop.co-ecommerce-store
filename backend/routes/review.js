import express from "express";
import {
  createProductReview,
  getProductReviews,
} from "../controllers/review.js";

const reviewRouter = express.Router();

reviewRouter.post("/productReviews", createProductReview);
reviewRouter.get("/productReviews/:id", getProductReviews);

export default reviewRouter;
