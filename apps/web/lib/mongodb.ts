/* eslint-disable turbo/no-undeclared-env-vars */
import mongoose from "mongoose";

// Use environment variable for flexibility
const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
  throw new Error("No database url")
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(DATABASE_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error; // Propagate error for handling in routes
  }
};

export default connectDB;
