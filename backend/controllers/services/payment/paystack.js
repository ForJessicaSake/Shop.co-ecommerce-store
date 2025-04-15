import { ErrorBoundary } from "../../../error/index.js";
import Transaction from "../../../models/transaction.js";
import { Paystack } from "../../../services/paystack.js";

export const initializePaystackTransaction = async (req, res, next) => {
  const reference = generateReference();
  try {
    const { amount, email, products } = req.body;
    const transaction = new Transaction({
      reference,
      email,
      amount: Number(amount),
      products,
      status: "AWAITING_PAYMENT",
      userId: req?.user?.userId,
    });
    await transaction.save();

    const clientBaseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : process.env.FRONTENDCLIENTURL;

    const callbackUrl = `${clientBaseUrl}/cart`;

    const paystack = await Paystack.transaction.initialize({
      amount: Number(amount) * 100,
      email,
      reference,
      callback_url: callbackUrl,
    });
    res.status(200).json(paystack.data);
  } catch (error) {
    next(new ErrorBoundary("Unable initialize paystack transaction", 500));
  }
};
export const handlePaystackWebhook = async (req, res, next) => {
  try {
    if (!req.headers["x-paystack-signature"]) {
      return res.sendStatus(401);
    }

    const event = req.body;
    if (event.event === "charge.success") {
      const reference = event.data.reference;
      try {
        const response = await Paystack.transaction.verify({ reference });
        if (response.data.status === "success") {
          const transaction = await Transaction.findOneAndUpdate(
            { reference },
            {
              status: "SUCCESSFUL",
              transactionDate: event.data.paid_at,
              fees: event.data.fees / 100,
              paymentChannel: event.data.authorization?.channel,
            }
          );
          if (!transaction) return res.sendStatus(404);
          else {
            return res.sendStatus(200);
          }
        }
      } catch {
        next(new ErrorBoundary("Transaction verification failed", 500));
      }
    }
  } catch {
    next(new ErrorBoundary("Webhook processing error", 500));
  }
};

export const verifyPaystackTransaction = async (req, res, next) => {
  try {
    const { reference } = req.params;
    const response = await Paystack.transaction.verify({ reference });
    if (response.data.status === "success") {
      res.status(200).json({
        status: "success",
        message: "Payment successfully completed",
        data: {
          status: response.data.status,
          amount: response.data.amount / 100,
          channel: response.data.channel,
          currency: response.data.currency,
          fees: response.data.fees / 100,
          transactionDate: response.data.paid_at,
          email: response.data.customer.email,
        },
      });
    } else if (response.data.status === "pending") {
      res.status(200).json({ status: "pending", message: "Payment pending" });
    } else {
      res.status(400).json({ status: "failed", message: "Payment failed" });
    }
  } catch (error) {
    next(new ErrorBoundary("Unable to verify transaction", 500));
  }
};

const generateReference = () => {
  const date = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 6);
  const random = Math.floor(100000 + Math.random() * 900000);
  return `SC${date}${random}`;
};
