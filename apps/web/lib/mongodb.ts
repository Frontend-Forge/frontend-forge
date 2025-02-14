import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/frontend-forge";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "frontend-forge",
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

export default connectDB;
