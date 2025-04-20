import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const mongoDbUri = process.env.MONGO_URI;
export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoDbUri);
    console.log("Database connected successfully");
  } catch (error) {
    process.exit(1);
  }
};
