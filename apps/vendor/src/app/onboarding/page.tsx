"use client";
import { useBaseStore } from "@/store/hook";
import { redirect, RedirectType } from "next/navigation";

const OnboardingPage = () => {
  const { onboardingDetails } = useBaseStore((state) => state);
  if (onboardingDetails.stage === "business") {
    return redirect("/onboarding/business", RedirectType.replace);
  }
  return redirect("/onboarding/user", RedirectType.replace);
};

export default OnboardingPage;
