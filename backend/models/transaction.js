import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: String, required: [true, "email is required"] },
  reference: { type: String, required: [true, "reference is required"] },
  amount: { type: Number, required: [true, "amount is required"] },
  paymentChannel: {
    type: String,
  },
  status: {
    type: String,
    enum: ["FAILED", "SUCCESSFUL", "PENDING", "AWAITING_PAYMENT"],
    required: [true, "status is required"],
  },
  transactionDate: { type: Date },
  fees: {
    type: Number,
  },
  products: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
