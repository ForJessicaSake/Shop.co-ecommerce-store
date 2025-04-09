import express from "express";
import {
  clientDetails,
  createClientAccount,
  loginClientAccount,
} from "../../controllers/auth/client.js";
import { authenticateRequest } from "../../controllers/auth/global.js";

const router = express.Router();
router.post("/signup", createClientAccount);
router.post("/login", loginClientAccount);
router.get("/client/:id", authenticateRequest, clientDetails);

export default router;
