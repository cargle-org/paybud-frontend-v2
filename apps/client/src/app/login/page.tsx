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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const getTokenSchema = z.object({
  email: z.email("Invalid email address"),
});
const loginSchema = z.object({
  email: z.email("Invalid email address"),
  token: z.string().min(6, "Token must be at least 6 characters"),
});

type GetTokenValues = z.infer<typeof getTokenSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const tokenform = useForm<GetTokenValues>({
    resolver: zodResolver(getTokenSchema),
    defaultValues: {
      email: "",
    },
  });

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      token: "",
    },
  });

  function onGetTokenSubmit(data: GetTokenValues) {
    setEmail(data.email);
  }

  function onLoginSubmit(data: LoginFormValues) {
    console.log(data);
  }

  return (
    <div className="w-full ">
      <div className=" rounded border border-gray-95 p-5 bg-white">
        <div className="">
          {!email ? (
            <form onSubmit={tokenform.handleSubmit(onGetTokenSubmit)} className=" space-y-2">
              <FormText
                type="email"
                {...tokenform.register("email")}
                name="email"
                placeholder="Enter Email"
                label="Email"
                error={tokenform.formState.errors.email?.message}
              />
              <FormSubmit className="" text="Log In" />
            </form>
          ) : (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className=" space-y-2">
              <FormText
                type="email"
                {...loginForm.register("email")}
                value={email}
                name="email"
                placeholder="Enter Email"
                label="Email"
                error={loginForm.formState.errors.email?.message}
              />
              <FormText placeholder="Enter Token" {...loginForm.register("token")} label="Token" error={loginForm.formState.errors.token?.message} />
              <FormSubmit className="" text="Log In" />
            </form>
          )}

          <div className=" flex items-center justify-between">
            <FormCheckBox name="remember" label="Remember Me" />
            <button className="  text-blue-50  text-xs p-1.5">Resend Token</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
