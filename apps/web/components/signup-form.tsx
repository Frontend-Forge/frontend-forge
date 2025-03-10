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

export function SignUpForm() {
  const { theme } = useDarkMode();

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
      <div className="grid gap-4">
        <Button variant="outline" className="h-11 dark:bg-[#1E1E21]">
          {theme === "dark" ? (
            <GitHubLightIcon className="mr-2 h-4 w-4" />
          ) : (
            <GitHubDarkIcon className="mr-2 h-4 w-4" />
          )}
          Continue with GitHub
        </Button>
        <Button variant="outline" className="h-11 dark:bg-[#1E1E21]">
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
          <Input id="email" type="email" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input id="password" type="password" />
        </div>
        <Button className="h-11 w-full bg-[#e9fa50] text-black hover:bg-[#dff038]">
          Sign In
        </Button>
        <p className="text-center text-xs  text-muted-foreground">
          By proceeding, you agree to GreatFontEnd&apos;s{" "}
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
