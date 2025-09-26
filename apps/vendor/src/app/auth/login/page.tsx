"use client";
import { FacebookButton } from "@repo/ui/extra/facebook-login";
import { GoogleButton } from "@repo/ui/extra/google-login";
import Seperator from "@repo/ui/extra/seperator";
import FormCheckBox from "@repo/ui/form/checkbox";
import FormText from "@repo/ui/form/FormText";
import FormPassword from "@repo/ui/form/password";
import FormSubmit from "@repo/ui/form/submit";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {}

  return (
    <div className="w-full ">
      <div className=" rounded border border-gray-95 p-5 bg-white">
        <div className="">
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
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
            <FormSubmit className="" text="Log In" />
          </form>
          <div className=" flex items-center justify-between">
            <FormCheckBox name="remember" label="Remember Me" />
            <Link href="/auth/forgot" className="  text-blue-50  text-xs p-1.5">
              Forgot Password?
            </Link>
          </div>
          <Seperator label="or" className="" />
          <div className="">
            <GoogleButton disabled />
            <FacebookButton disabled />
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <span className=" text-sm">Don't have an account?</span>
        <Link href="/auth/register" className=" ml-2 text-blue-50 font-semibold text-sm">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
