import express from "express";
import { getTransactions } from "../controllers/services/transaction.js";

const transactionRouter = express.Router();

transactionRouter.get("/transactions", getTransactions);

export default transactionRouter;
