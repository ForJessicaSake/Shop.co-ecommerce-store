import express from "express";
import { getOrders } from "../controllers/order.js";

const orderRouter = express.Router();

orderRouter.get("/orders/:userId", getOrders);

export default orderRouter;
