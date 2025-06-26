import express from "express";
import { authenticateJWT } from "../middlewares/auth";
import User from "../models/User";
import { isValidObjectId } from "mongoose";

const router = express.Router();

router.post(
  "/mark-completed",
  authenticateJWT,
  async (req, res): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const { questionId } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      if (!isValidObjectId(questionId)) {
        res.status(400).json({ error: "Question ID is not valid" });
        return;
      }

      user.questionsSolved.push(questionId);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Question marked as completed",
      });
      return;
    } catch (error) {
      console.error("Error marking question as completed:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }
);

router.post(
  "/mark-incomplete",
  authenticateJWT,
  async (req, res): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const { questionId } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      if (!isValidObjectId(questionId)) {
        res.status(400).json({ error: "Question ID is not valid" });
        return;
      }

      if (!user.questionsSolved.includes(questionId)) {
        res.status(400).json({ error: "Question not marked as completed" });
        return;
      }

      user.questionsSolved = user.questionsSolved.filter(
        (id) => id.toString() !== questionId
      );
      await user.save();

      res.status(200).json({
        success: true,
        message: "Question marked as incomplete",
      });
      return;
    } catch (error) {
      console.error("Error marking question as incomplete:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }
);

router.get(
  "/check-solved/:questionId",
  authenticateJWT,
  async (req, res): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const { questionId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      if (!isValidObjectId(questionId)) {
        res.status(400).json({ error: "Question ID is not valid" });
        return;
      }

      const isSolved = user.questionsSolved.includes(questionId);

      res.status(200).json({
        success: true,
        questionId,
        isSolved,
        message: isSolved ? "Question is solved" : "Question is not solved",
      });
      return;
    } catch (error) {
      console.error("Error checking question solved status:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }
);

export default router;
