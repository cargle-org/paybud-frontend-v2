"use client";

import { redirect, RedirectType, useSearchParams } from "next/navigation";
import OnboardingProfileForm from "./components/profile-form";
import OnboardingAccountDetailsForm from "./components/account-details-form";

const OnboardingBusinessPage = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  if (step === "account-details") {
    return <OnboardingAccountDetailsForm />;
  }
  return <OnboardingProfileForm />;
};

export default OnboardingBusinessPage;
