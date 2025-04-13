import { ErrorBoundary } from "../../error/index.js";
import Transaction from "../../models/transaction.js";

export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({}).sort({ created: -1 });
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to fetch transactions", 500));
  }
};
