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
import session from "express-session";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { authenticateRequest } from "./controllers/auth/global.js";

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
    ],
    credentials: true,
  })
);

const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json());

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Shop.co API",
    version: "1.0.0",
    description: "This is the API documentation for the Shop.co application.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "routes/*.js")],
};

const specs = swaggerJSDoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use("/api/products", router);
app.use("/auth/api/products", authenticateRequest, router);
app.use("/api", newsLetterRouter);
app.use("/api", reviewRouter);
app.use("/auth/api", clientAuthRouter);
app.use("/auth/api/admin", adminAuthRouter);

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
