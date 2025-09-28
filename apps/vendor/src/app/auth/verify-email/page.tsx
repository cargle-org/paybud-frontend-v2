"use client";
import FormSubmit from "@repo/ui/form/submit";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft]);

  useEffect(() => {
    if (email) {
      // Call your email verification function here with the email
      // Example: verifyEmail(email);
    } else {
      //   router.replace("/auth/login");
    }
  }, [email]);
  return (
    <div className=" w-full ">
      <h3 className=" text-xl text-blue-15 text-center mb-3">Verify Your Email</h3>
      <div className="rounded border border-gray-95 p-5 bg-white">
        <p className=" text-sm mb-3 text-center ">We need to verify your email address to complete your account setup.</p>
        <p className="text-sm mb-3 text-center">
          Click the verification link in your email to verify your account. If you don't see the email, check your spam folder.
        </p>
        <FormSubmit disabled={timeLeft > 0} className="" text={"Resend Verification Email " + (timeLeft !== 0 ? `${timeLeft}s` : "")} />
      </div>
      <div className="mt-5 flex items-center justify-center">
        <span className=" text-sm">Return to login?</span>
        <Link href="/auth/login" className=" ml-2 text-blue-50 font-semibold text-sm">
          Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
