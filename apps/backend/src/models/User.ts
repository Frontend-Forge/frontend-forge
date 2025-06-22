// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows null values but enforces uniqueness when present
  },
  avatar: {
    type: String, // Profile picture URL
  },

  // OAuth IDs
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true,
  },

  // Account Info
  provider: {
    type: String,
    enum: ["local", "google", "github"],
    default: "local",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  // For local accounts
  password: {
    type: String,
    required: function (this: any) {
      return this.provider === "local";
    },
  },

  // Metadata
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("User", userSchema);
