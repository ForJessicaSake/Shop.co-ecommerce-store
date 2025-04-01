import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "./config/db.js";
import router from "./routes/product.js";
import newsLetterRouter from "./routes/newsletter.js";
import reviewRouter from "./routes/review.js";
import clientAuthRouter from "./routes/auth/client.js";
import adminAuthRouter from "./routes/auth/admin.js";
import session from "express-session";

const app = express();
app.use(
  session({
    secret: process.env.COOKIE_SEESION,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 * 60 },
  })
);
dotenv.config();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json());
app.use("/api/products", router);
app.use("/api", newsLetterRouter);
app.use("/api", reviewRouter);
app.use("/api/auth", clientAuthRouter);
app.use("/api/auth/admin", adminAuthRouter);

app.use((err, req, res, next) => {
  const { message, status } = err;
  res.status(status).json({ message });
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDatabase();
});
