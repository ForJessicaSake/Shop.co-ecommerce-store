import express from "express";
import {
  initializePaystackTransaction,
  verifyPaystackTransaction,
} from "../controllers/services/payment/paystack.js";

const paymentRouter = express.Router();

paymentRouter.post("/initilizeTransaction", initializePaystackTransaction);
paymentRouter.get("/verifyTransaction/:reference", verifyPaystackTransaction);

export default paymentRouter;
