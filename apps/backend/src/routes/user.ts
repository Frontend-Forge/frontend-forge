import express from "express";
import { authenticateJWT } from "../middlewares/auth";
import User from "../models/User";

const router = express.Router();

// Get current user data (protected route)
router.get("/me", authenticateJWT, async (req, res) => {
  try {
    // The JWT middleware adds the decoded token to req.user
    const userId = (req as any).user.id;

    // Find user and exclude password field
    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
