import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import { connectDatabase } from "./config/db.js";
import router from "./routes/product.js";
import newsLetterRouter from "./routes/newsletter.js";
import reviewRouter from "./routes/review.js";
import clientAuthRouter from "./routes/auth/client.js";
import adminAuthRouter from "./routes/auth/admin.js";
import paymentRouter from "./routes/payment.js";
import transactionRouter from "./routes/transaction.js";
import orderRouter from "./routes/order.js";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import { authenticateRequest } from "./controllers/auth/global.js";
import { handlePaystackWebhook } from "./controllers/services/payment/paystack.js";
import swaggerDocument from './swagger-output.json' with { type: 'json' };


const app = express();
app.use(
  session({
    secret: process.env.COOKIE_SEESION,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 * 60 },
  })
);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.FRONTENDCLIENTURL,
      process.env.FRONTENDADMINURL,
    ],
    credentials: true,
  })
);

const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json());
app.use("/api/products", router);
app.use("/auth/api/products", authenticateRequest, router);
app.use("/api", newsLetterRouter);
app.use("/api", reviewRouter);
app.use("/auth/api", clientAuthRouter);
app.use("/auth/api", authenticateRequest, paymentRouter);
app.use("/auth/api", transactionRouter);
app.use("/auth/api", orderRouter);
app.use("/auth/api/admin", adminAuthRouter);
app.use("/auth/api/admin", authenticateRequest, transactionRouter);
app.post(
  "/webhook/paystack",
  express.raw({ type: "application/json" }),
  handlePaystackWebhook
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  const { message, status } = err;
  res.status(status).json({ message });
  next();
});

app.listen(PORT, () => {
  connectDatabase();
});
