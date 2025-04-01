import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
  },
});

export const User = mongoose.model("User", userSchema);

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
