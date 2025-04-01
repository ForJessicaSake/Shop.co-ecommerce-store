import express from "express";
import {
  createAdminAccount,
  loginAdminAccount,
} from "../../controllers/auth/admin.js";

const router = express.Router();
router.post("/signup", createAdminAccount);
router.post("/login", loginAdminAccount);

export default router;
