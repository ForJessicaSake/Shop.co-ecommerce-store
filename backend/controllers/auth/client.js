import { ErrorBoundary } from "../../error/index.js";
import { User } from "../../models/auth.js";
import bcrypt from "bcryptjs";
import { createToken } from "./global.js";
import { generatePassword } from "../../utils.js";
import { sendMail } from "../services/mail/index.js";

export const createClientAccount = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ email, password: hashPassword });
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

export const loginClientAccount = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    const token = createToken(user._id);
    if (isValid) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          userId: user._id,
          token,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    next(
      new ErrorBoundary(error?.response?.data?.message ?? "Unable to login")
    );
  }
};

export const clientDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User details",
        data: {
          user: user,
        },
      });
    }
  } catch (error) {
    next(
      new ErrorBoundary(
        error?.response?.data?.message ?? "Unable to retrieve client details"
      )
    );
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    const password = generatePassword();
    const hashPassword = await bcrypt.hash(password, 12);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { password: hashPassword } },
      { new: true }
    );
    if (!updatedUser) {
      res.status(500).json({
        success: false,
        message: "Unable to update password",
      });
    }
    await sendMail({
      recipient: email,
      subject: "Your Password Has Been Reset",
      mail: `
        <h4>Password Reset Successful</h4>
        <p>Your password has been successfully reset.</p>
        <p><strong>New Password:</strong> ${password}</p>
        <p>Please use this password to <span><a href="https://shop-co-ecommerce-store.vercel.app/">log into your account</a></span>.</p>
        <p>If you did not request this reset, please contact our support team immediately.</p>
        <p>Best regards,<br>Team <a href="https://shop-co-ecommerce-store.vercel.app" target="_blank" rel="noopener noreferrer">Shop.co</a></p>`,
    });
    res.status(200).json({
      success: true,
      message:
        "Your password has been reset. Check your email to find your new password.",
    });
  } catch (error) {
    next(
      new ErrorBoundary(
        error?.response?.data?.message ?? "Unable to reset password"
      )
    );
  }
};
