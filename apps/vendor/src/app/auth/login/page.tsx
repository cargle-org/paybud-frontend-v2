"use client";
import { FacebookButton } from "../../../../../../packages/ui/dist/oauth/facebook-login";
import { GoogleButton } from "../../../../../../packages/ui/dist/oauth/google-login";
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
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import { useBaseStore } from "@/store/hook";
import { useRouter } from "nextjs-toploader/app";
import useToast from "@/context/toast";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { openToast } = useToast();
  const router = useRouter();
  const { setAccessToken, setUser } = useBaseStore((state) => state);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      openToast({
        type: "success",
        message: data.message || "Login successful",
        description: "You have been logged in successfully.",
      });
      if (!data?.data?.user.isEmailVerified) {
        router.push("/auth/verify-email");
        return;
      }
      setAccessToken(data?.data?.accessToken);
      setUser(data?.data?.user);
      // router.push("/");

      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.log(error);
      openToast({
        type: "error",
        message: "Login failed",
      });
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (data) => {
      openToast({
        type: "success",
        message: data.message || "Login successful",
        description: "You have been logged in successfully.",
      });
      if (!data?.data?.user.isEmailVerified) {
        router.push("/auth/verify-email");
        return;
      }
      setAccessToken(data?.data?.accessToken);
      setUser(data?.data?.user);
      // router.push("/");

      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.log(error);
      openToast({
        type: "error",
        message: "Login failed",
      });
    },
  });

  const facebookLoginMutation = useMutation({
    mutationFn: authService.facebookLogin,
    onSuccess: (data) => {
      openToast({
        type: "success",
        message: data.message || "Login successful",
        description: "You have been logged in successfully.",
      });
      if (!data?.data?.user.isEmailVerified) {
        router.push("/auth/verify-email");
        return;
      }
      setAccessToken(data?.data?.accessToken);
      setUser(data?.data?.user);
      // router.push("/");

      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.log(error);
      openToast({
        type: "error",
        message: "Login failed",
      });
    },
  });

  function onSubmit(data: LoginFormValues) {
    loginMutation.mutate(data);
  }

  return (
    <div className="w-full ">
      <div className=" rounded border border-gray-95 p-5 bg-white">
        <div className="">
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
            <FormCheckBox {...form.register("rememberMe")} name="rememberMe" label="Remember Me" />
            <Link href="/auth/forgot-password" className="  text-blue-50  text-xs p-1.5">
              Forgot Password?
            </Link>
          </div>
          <Seperator label="or" className="" />
          <div className="">
            <GoogleButton
              handleLogin={(token) => googleLoginMutation.mutate(token)}
              handleError={() => openToast({ type: "error", message: "Google login failed" })}
            />
            <FacebookButton
              handleLogin={(token) => facebookLoginMutation.mutate(token)}
              handleError={() => openToast({ type: "error", message: "Facebook login failed" })}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <span className=" text-sm">Don't have an account?</span>
        <Link href="/auth/register" className=" ml-2 text-blue-50 font-semibold text-sm">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
