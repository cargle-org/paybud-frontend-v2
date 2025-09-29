import { redirect, RedirectType } from "next/navigation";
import React from "react";

const OnboardingPage = () => {
  return redirect("/onboarding/business", RedirectType.replace);
};

export default OnboardingPage;
