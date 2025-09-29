"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormText from "@repo/ui/form/text";
import FormSubmit from "@repo/ui/form/submit";
import Link from "next/dist/client/link";
import { is } from "zod/locales";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import useToast from "@/context/toast";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const { openToast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const forgotPasswordMutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (data) => {
      openToast({
        type: "success",
        message: "Password reset link sent",
        description: data.message,
      });
      setIsSubmitted(true);
      setTimeLeft(60); // Reset the timer
    },
    onError: (error: any) => {
      openToast({
        type: "error",
        message: "Failed to send password reset link",
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

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(data: ForgotPasswordValues) {
    forgotPasswordMutation.mutate(data.email);
    setTimeLeft(60);
  }

  return (
    <div className="w-full ">
      <h3 className=" text-xl text-blue-15 text-center mb-3">Forgot Password?</h3>
      <div className=" rounded border border-gray-95 p-5 bg-white">
        {isSubmitted ? (
          <div className="">
            <p className=" text-sm mb-3 text-center ">
              Reset link sent to: <strong>{form.getValues("email")}</strong>{" "}
            </p>
            <p className="text-sm mb-3 text-center">We've sent password reset instructions to your email address.</p>
            <FormSubmit disabled={timeLeft > 0} className="" text={"Resend Email " + (timeLeft !== 0 ? `${timeLeft}s` : "")} />
          </div>
        ) : (
          <div className="">
            <p className=" text-sm mb-3 text-center ">Enter your email address and we'll send you a link to reset your password.</p>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
              <FormText
                type="email"
                {...form.register("email")}
                name="email"
                placeholder="Enter Email"
                error={form.formState.errors.email?.message}
              />
              <FormSubmit className="" text="Send Reset Link" />
            </form>
          </div>
        )}
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

export default ForgotPasswordPage;
