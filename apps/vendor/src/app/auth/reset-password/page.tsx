"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import FormPassword from "@repo/ui/form/password";
import FormSubmit from "@repo/ui/form/submit";
import Link from "next/dist/client/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: ResetPasswordFormValues) {}

  return (
    <div className="w-full ">
      <h3 className=" text-xl text-blue-15 text-center mb-3">Reset Your Password?</h3>
      <div className=" rounded border border-gray-95 p-5 bg-white">
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
          <FormPassword
            placeholder="Enter Password"
            {...form.register("password")}
            label="Password"
            error={form.formState.errors.password?.message}
          />
          <FormPassword
            placeholder="Confirm Password"
            {...form.register("confirmPassword")}
            label="Confirm Password"
            error={form.formState.errors.confirmPassword?.message}
          />
          <FormSubmit className="" text="Reset Password" />
        </form>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <span className=" text-sm">Return to login?</span>
        <Link href="/auth/login" className=" ml-1 text-blue-40 text-sm">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
