import { ErrorBoundary } from "../../error/index.js";
import bcrypt from "bcryptjs";
import { Admin } from "../../models/auth.js";
import { createToken } from "./global.js";
import { generatePassword } from "../../utils.js";
import { sendMail } from "../services/mail/index.js";
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
    if (admin.status === "INACTIVE") {
      return res.status(400).json({
        success: false,
        message: "Administrator account is inactive",
      });
    }
    const isValid = await bcrypt.compare(password, admin.password);
    const token = createToken(admin._id);
    if (isValid) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: admin._id,
        data: {
          userId: admin._id,
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
      new ErrorBoundary(
        error?.response?.data?.message ?? "Unable to validate credentials"
      )
    );
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Admin.find({});
    if (!users) {
      return res.status(500).json({
        success: false,
        message: "No users found",
      });
    }
    const data = users.map((user) => {
      return {
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        status: user.status,
        role: user.role,
      };
    });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: data,
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to fetch users", 500));
  }
};

export const disableUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    user.status = "INACTIVE";
    await user.save();
    res.status(200).json({
      success: true,
      message: "User disabled successfully",
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to update user status", 500));
  }
};

export const enableUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    user.status = "ACTIVE";
    await user.save();
    res.status(200).json({
      success: true,
      message: "User enabled successfully",
    });
  } catch (error) {
    next(new ErrorBoundary("Unable to update user status", 500));
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    const password = generatePassword();
    const hashPassword = await bcrypt.hash(password, 12);
    const updatedUser = await Admin.findOneAndUpdate(
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
        <p>Please use this password to <span><a href="https://shop-co-ecommerce-store.vercel.app/login">log into your account</a></span>.</p>
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

export const InviteAdmin = async (req, res, next) => {
  const { email, role } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Administrator already exists",
      });
    } else {
      const password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await Admin.create({
        email,
        role,
        password: hashedPassword,
      });
      await newUser.save();
      await sendMail({
        recipient: email,
        subject: "Welcome to Shop.co – Your Account Has Been Created",
        mail: `
        <h4>Welcome to Shop.co!</h4>
        <p>An account has been successfully created for you.</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>You can use this password to <a href="https://shop-co-ecommerce-store-admin.vercel.app//login">log into your account</a>.</p>
        <p>If you have any questions or did not expect this email, please <a href="https://shop-co-ecommerce-store.vercel.app" target="_blank" rel="noopener noreferrer">contact our support team</a> immediately.</p>
        <p>Best regards,<br>The <a href="https://shop-co-ecommerce-store-admin.vercel.app" target="_blank" rel="noopener noreferrer">Shop.co</a> Team</p>
      `,
      });
      res.status(200).json({
        success: true,
        message:
          "An account has been created for you, check your email to proceed.",
      });
    }
  } catch (error) {
    next(new ErrorBoundary("Unable to create account", 500));
  }
};
