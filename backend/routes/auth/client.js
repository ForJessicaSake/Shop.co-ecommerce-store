import express from "express";
import {
  createClientAccount,
  loginClientAccount,
} from "../../controllers/auth/client.js";

const router = express.Router();
router.post("/signup", createClientAccount);
router.post("/login", loginClientAccount);

export default router;
