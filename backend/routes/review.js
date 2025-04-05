import express from "express";
import {
  createProductReview,
  getProductReviews,
} from "../controllers/review.js";
import { authenticateRequest } from "../controllers/auth/global.js";

const reviewRouter = express.Router();

reviewRouter.post("/reviews", authenticateRequest, createProductReview);
reviewRouter.get("/reviews/:id", getProductReviews);

export default reviewRouter;
