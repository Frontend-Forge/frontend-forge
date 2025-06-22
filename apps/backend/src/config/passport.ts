// passport.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails?.[0]?.value },
          ],
        });

        if (user) {
          // Update existing user with latest info
          user.name = profile.displayName || user.name;
          user.email = profile.emails?.[0]?.value || user.email;
          user.avatar = profile.photos?.[0]?.value || user.avatar;
          user.lastLogin = new Date();

          // If user exists but doesn't have googleId, add it
          if (!user.googleId) {
            user.googleId = profile.id;
            user.provider = "google";
          }

          await user.save();
        } else {
          // Create new user
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
            provider: "google",
            isVerified: true,
            lastLogin: new Date(),
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "/api/auth/github/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        let user = await User.findOne({
          $or: [
            { githubId: profile.id },
            { email: profile.emails?.[0]?.value },
          ],
        });

        if (user) {
          // Update existing user
          user.name = profile.displayName || profile.username || user.name;
          user.email = profile.emails?.[0]?.value || user.email;
          user.avatar = profile.photos?.[0]?.value || user.avatar;
          user.lastLogin = new Date();

          if (!user.githubId) {
            user.githubId = profile.id;
            user.provider = "github";
          }

          await user.save();
        } else {
          // Create new user
          user = await User.create({
            githubId: profile.id,
            name: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
            provider: "github",
            isVerified: true,
            lastLogin: new Date(),
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
