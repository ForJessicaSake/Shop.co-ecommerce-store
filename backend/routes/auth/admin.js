import express from "express";
import {
  createAdminAccount,
  disableUser,
  enableUser,
  forgotPassword,
  getAllUsers,
  InviteAdmin,
  loginAdminAccount,
} from "../../controllers/auth/admin.js";
import { authenticateRequest } from "../../controllers/auth/global.js";

const router = express.Router();
router.post("/signup", createAdminAccount);
router.post("/login", loginAdminAccount);
router.post("/forgotPassword", forgotPassword);
router.post("/invite", authenticateRequest, InviteAdmin);
router.get("/users", authenticateRequest, getAllUsers);
router.post("/disableUser", authenticateRequest, disableUser);
router.post("/enableUser", authenticateRequest, enableUser);

export default router;
