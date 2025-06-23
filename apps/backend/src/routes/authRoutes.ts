import express from "express";
import passport from "passport";
import { login, signup } from "../controllers/authController";
import jwt from "jsonwebtoken";

const router = express.Router();

// Local
router.post("/signup", (req, res, next) => {
  Promise.resolve(signup(req, res)).catch(next);
});
router.post("/login", (req, res, next) => {
  Promise.resolve(login(req, res)).catch(next);
});

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    const user = req.user as { _id: string };
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    res.redirect(`http://localhost:3000?token=${token}`); // or send a token back
  }
);

// GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const user = req.user as { _id: string };
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    res.redirect(`http://localhost:3000?token=${token}`); // or send a token back
  }
);

export default router;
