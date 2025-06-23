"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import {
  GitHubDarkIcon,
  GitHubLightIcon,
  GoogleIcon,
} from "@trigger.dev/companyicons";
import { useDarkMode } from "@/hooks/useDarkMode";

export function SignUpForm() {
  const { theme } = useDarkMode();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract token from URL on component mount (for OAuth redirects)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Save token to localStorage
      localStorage.setItem("authToken", token);

      // Clean up URL by removing token parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("token");
      window.history.replaceState({}, document.title, newUrl.pathname);

      console.log("OAuth token saved to localStorage");

      // Optionally redirect to dashboard or show success message
      // window.location.href = '/dashboard';
    }
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      // Save token to localStorage
      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Signup token saved to localStorage");

        // Optionally redirect to dashboard or show success message
        window.location.href = "/";
      }

      console.log("Signup Success:", response.data);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Signup failed");
    } finally {
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
          Create a new Account
        </h1>
        <p className="text-sm text-muted-foreground dark:text-gray-300">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium dark:text-white text-black hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
      <form onSubmit={handleSignUp} className="grid gap-4 w-full">
        <Button
          type="button"
          variant="outline"
          className="h-11 dark:bg-[#1E1E21]"
          onClick={handleGitHubSignUp}
        >
          {theme === "dark" ? (
            <GitHubLightIcon className="mr-2 h-4 w-4" />
          ) : (
            <GitHubDarkIcon className="mr-2 h-4 w-4" />
          )}
          Continue with GitHub
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 dark:bg-[#1E1E21]"
          onClick={handleGoogleSignUp}
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
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <Button
          type="submit"
          className="h-11 w-full bg-[#e9fa50] text-black hover:bg-[#dff038]"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
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
      </form>
    </div>
  );
}
