import { redirect, RedirectType } from "next/navigation";

const OnboardingPage = () => {
  return redirect("/onboarding/user", RedirectType.replace);
};

export default OnboardingPage;
