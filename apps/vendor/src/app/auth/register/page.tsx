"use client";
import { FacebookButton } from "../../../../../../packages/ui/dist/oauth/facebook-login";
import { GoogleButton } from "../../../../../../packages/ui/dist/oauth/google-login";
import Seperator from "@repo/ui/extra/seperator";
import FormText from "@repo/ui/form/FormText";
import FormPassword from "@repo/ui/form/password";
import FormSubmit from "@repo/ui/form/submit";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
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

type SignUpFormValues = z.infer<typeof signUpSchema>;

const RegisterPage = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: SignUpFormValues) {}
  return (
    <div className="w-full ">
      <div className=" rounded-sm border border-gray-95 p-5 bg-white">
        <div className="">
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormText
              type="text"
              {...form.register("fullName")}
              name="fullName"
              placeholder="Enter Full Name"
              label="Full Name"
              error={form.formState.errors.fullName?.message}
            />
            <FormText
              type="email"
              {...form.register("email")}
              name="email"
              placeholder="Enter Email"
              label="Email"
              error={form.formState.errors.email?.message}
            />
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
            <FormSubmit className="" text="Register" />
          </form>
          <Seperator label="or" className="" />
          <div className="">
            <GoogleButton disabled text="Register with Google" />
            <FacebookButton disabled text="Register with Facebook" />
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <span className=" text-sm">Already have an account?</span>
        <Link href="/auth/login" className=" ml-2 text-blue-50 font-semibold text-sm">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
