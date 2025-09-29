"use client";
import useToast from "@/context/toast";
import authService from "@/services/auth.service";
import FormSubmit from "@repo/ui/form/submit";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const { openToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ? decodeURIComponent(searchParams.get("email")!) : null;
  const verified = searchParams.get("verified") ? Boolean(searchParams.get("verified") === "true") : undefined;
  const isLogin = Boolean(searchParams.get("isLogin") === "true");
  const [timeLeft, setTimeLeft] = useState(60);
  const [returnToLoginTimer, setReturnToLoginTimer] = useState<number>();

  const verifyEmailMutation = useMutation({
    mutationFn: authService.getVerifyEmail,
    onSuccess: (data) => {
      openToast({
        type: "success",
        message: "Verification email sent",
        description: data.message,
      });
      setTimeLeft(60); // Reset the timer
    },
    onError: (error: AxiosError<any>) => {
      openToast({
        type: "error",
        message: "Failed to send verification email",
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft]);

  useEffect(() => {
    if (returnToLoginTimer === undefined) {
      return;
    }
    const returnToLoginCountdown = setInterval(() => {
      if (returnToLoginTimer > 0) {
        setReturnToLoginTimer(returnToLoginTimer - 1);
      } else {
        router.push("/auth/login");
      }
    }, 1000);

    return () => clearInterval(returnToLoginCountdown);
  }, [returnToLoginTimer]);

  useEffect(() => {
    if (email) {
      if (isLogin) verifyEmailMutation.mutate(email);
    } else {
      router.replace("/auth/login");
    }
  }, [email, isLogin]);

  useEffect(() => {
    if (verified !== undefined) {
      if (verified) {
        setReturnToLoginTimer(10);
      } else {
        setTimeLeft(0);
        openToast({
          type: "error",
          message: "Email verification failed",
          description: "The verification link is invalid or has expired. Please try again.",
        });
      }
    }
  }, [verified]);

  if (returnToLoginTimer !== undefined) {
    return (
      <div className=" w-full ">
        <h3 className=" text-xl text-blue-15 text-center mb-3"> Email Verification Successful</h3>
        <div className="rounded border border-gray-95 p-5 bg-white">
          <p className=" text-sm mb-3 text-center ">
            Your email address (<span className="font-semibold">{email}</span>) has been verified.
          </p>
          <FormSubmit
            onClick={() => router.replace("/auth/login")}
            className=""
            text={"Return To login " + (returnToLoginTimer !== 0 ? `(${returnToLoginTimer}s)` : "")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full ">
      <h3 className=" text-xl text-blue-15 text-center mb-3">Verify Your Email</h3>
      <div className="rounded border border-gray-95 p-5 bg-white">
        <p className=" text-sm mb-3 text-center ">
          We need to verify your email address (<span className="font-semibold">{email}</span>) to complete your account setup.
        </p>
        <p className="text-sm mb-3 text-center">
          Click the verification link in your email to verify your account. If you don't see the email, check your spam folder.
        </p>
        <FormSubmit
          onClick={() => verifyEmailMutation.mutate(email!)}
          disabled={timeLeft > 0}
          className=""
          text={"Resend Verification Email " + (timeLeft !== 0 ? `${timeLeft}s` : "")}
          isLoading={verifyEmailMutation.isPending}
        />
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
