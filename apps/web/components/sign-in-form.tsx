import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import {
  GitHubDarkIcon,
  GitHubLightIcon,
  GoogleIcon,
} from "@trigger.dev/companyicons";
import { useDarkMode } from "@/hooks/useDarkMode";
import React from "react";
import axios from "axios";

export function SignInForm() {
  const { theme } = useDarkMode();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Store token or redirect user here (later)
      console.log("Login Success:", response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err?.message || "Sign-in failed");
      setLoading(false);
    }
  };

  // Handle Google OAuth
  const handleGoogleSignUp = () => {
    // Redirect to your backend Google OAuth endpoint
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  // Handle GitHub OAuth
  const handleGitHubSignUp = () => {
    // Redirect to your backend GitHub OAuth endpoint
    window.location.href = "http://localhost:4000/api/auth/github";
  };

  return (
    <div className="mx-auto h-screen w-full max-w-md space-y-6 flex flex-col items-center justify-center px-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight ">
          Sign in to your account
        </h1>
        <p className="text-sm text-muted-foreground dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium dark:text-white text-black hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>
      <div className="grid gap-4">
        <Button
          onClick={handleGitHubSignUp}
          variant="outline"
          className="h-11 dark:bg-[#1E1E21]"
        >
          {theme === "dark" ? (
            <GitHubLightIcon className="mr-2 h-4 w-4" />
          ) : (
            <GitHubDarkIcon className="mr-2 h-4 w-4" />
          )}
          Continue with GitHub
        </Button>
        <Button
          onClick={handleGoogleSignUp}
          variant="outline"
          className="h-11 dark:bg-[#1E1E21]"
        >
          <GoogleIcon className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="dark:bg-[#18181B] bg-white px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
        </div>
        <Link
          href="#"
          className="text-sm font-medium text-black dark:text-white hover:underline"
        >
          Forgot your password?
        </Link>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <Button
          onClick={handleSignIn}
          className="h-11 w-full bg-[#e9fa50] text-black hover:bg-[#dff038]"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        <p className="text-center text-xs  text-muted-foreground">
          By proceeding, you agree to FrontendForge&apos;s{" "}
          <Link href="#" className="underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
