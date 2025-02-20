import mongoose from "mongoose";

// Use environment variable for flexibility
const MONGODB_URI = "mongodb://localhost:27017/frontend-forge";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error; // Propagate error for handling in routes
  }
};

export default connectDB;
