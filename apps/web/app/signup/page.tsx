"use client";

import Footer from "@/components/Footer";
import LandingHeader from "@/components/landing-header";
import { SignUpForm } from "@/components/signup-form";

export default function Page() {
  return (
    <div className="w-full h-full">
      <LandingHeader />
      <SignUpForm />
      <Footer />
    </div>
  );
}
