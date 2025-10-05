"use client";

import { redirect, RedirectType } from "next/navigation";
import { useState } from "react";
import OnboardingProfileForm from "./components/profile-form";
import OnboardingAccountDetailsForm from "./components/account-details-form";

const OnboardingBusinessPage = () => {
  const [stage, setStage] = useState<"profile" | "account-details">("profile");

  if (stage === "profile") {
    return <OnboardingProfileForm onSubmit={() => setStage("account-details")} />;
  }

  if (stage === "account-details") {
    return <OnboardingAccountDetailsForm />;
  }

  return redirect("/onboarding", RedirectType.replace);
};

export default OnboardingBusinessPage;
