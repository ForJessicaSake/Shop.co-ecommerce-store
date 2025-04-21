import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email cannot be blank"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be blank"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email cannot be blank"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be blank"],
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "SUPER_ADMIN"],
      default: "ADMIN",
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);
