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
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import { AxiosError } from "axios";
import useToast from "@/context/toast";
import { useRouter } from "nextjs-toploader/app";
import { useBaseStore } from "@/store/hook";

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
  const { setAccessToken } = useBaseStore((state) => state);
  const router = useRouter();
  const { openToast } = useToast();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      openToast({
        type: "success",
        message: "Registration successful",
        description: data.message,
      });
      if (data?.data && !data?.data?.isEmailVerified) {
        const email = encodeURIComponent(data?.data?.email || "");
        router.push(`/auth/verify-email?email=${email}`);
        return;
      }
      router.push("/onboarding");
    },
    onError: (error: AxiosError<any>) => {
      openToast({
        type: "error",
        message: "Registration failed",
        description: error.response?.data.message as string,
      });
    },
  });

  const googleLogin = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (data) => {
      openToast({
        type: "success",
        message: "Registration successful",
        description: data.message,
      });
      setAccessToken(data?.data?.accessToken!);
      if (data.data?.user.business && data.data?.user.business?.isVerified) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    },
    onError: (error: AxiosError<any>) => {
      openToast({
        type: "error",
        message: "Registration failed",
        description: error.response?.data.message as string,
      });
    },
  });
  const facebookLogin = useMutation({
    mutationFn: authService.facebookLogin,
    onSuccess: (data) => {
      openToast({
        type: "success",
        message: "Registration successful",
        description: data.message,
      });
      setAccessToken(data?.data?.accessToken!);
      if (data.data?.user.business && data.data?.user.business?.isVerified) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    },
    onError: (error: AxiosError<any>) => {
      openToast({
        type: "error",
        message: "Registration failed",
        description: error.response?.data.message as string,
      });
    },
  });

  function onSubmit(data: SignUpFormValues) {
    registerMutation.mutate(data);
  }
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
            <GoogleButton
              handleError={() =>
                openToast({
                  message: "Google Login Failed",
                  type: "error",
                })
              }
              handleLogin={(token) => googleLogin.mutate(token)}
              text="Register with Google"
            />
            <FacebookButton
              handleError={() =>
                openToast({
                  message: "Facebook Login Failed",
                  type: "error",
                })
              }
              handleLogin={(token) => facebookLogin.mutate(token)}
              text="Register with Facebook"
            />
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
