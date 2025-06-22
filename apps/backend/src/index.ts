import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import "./config/passport";

dotenv.config();

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("Backend running on port 4000");
    });
  })
  .catch((err) => console.log(err));
