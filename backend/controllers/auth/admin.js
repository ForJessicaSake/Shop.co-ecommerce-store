import { ErrorBoundary } from "../../error/index.js";
import bcrypt from "bcryptjs";
import { Admin } from "../../models/auth.js";

export const createAdminAccount = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({
        success: false,
        message: "Administrator already exists",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new Admin({ email, password: hashPassword });
      await newUser.save();
      res.status(201).json({
        success: true,
        message: "Account created successfully",
      });
    }
  } catch (error) {
    next(new ErrorBoundary("Unable to create account", 500));
  }
};

export const loginAdminAccount = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Administrator does not exist",
      });
    }
    const isValid = await bcrypt.compare(password, admin.password);
    if (isValid) {
      req.session.admin_id = admin._id;
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: admin._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    next(
      new ErrorBoundary(
        error?.response?.data?.message ?? "Unable to validate credentials"
      )
    );
  }
};
