"use client";

import Footer from "@/components/Footer";
import LandingHeader from "@/components/landing-header";
import { SignInForm } from "@/components/sign-in-form";

export default function Page() {
  return (
    <div className="w-full h-full">
      <LandingHeader />
      <SignInForm />
      <Footer />
    </div>
  );
}
