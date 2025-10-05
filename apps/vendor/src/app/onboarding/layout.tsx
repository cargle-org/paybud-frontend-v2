import AuthProvider from "@/providers/AuthProvider";
import Link from "next/link";
import React from "react";

const OnboardingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <div className=" w-screen h-screen flex">
        <div className=" w-full  lg:!w-1/2 h-full flex items-center justify-center shrink-0 relative p-10">
          <div className=" w-full max-w-[600px] mx-auto flex flex-col gap-5 items-center min-h-[720px] ">{children}</div>
          <p className=" w-full text-center px-2 absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-50">
            © 2025 Salesforce, Inc. All rights reserved. |{" "}
            <Link className=" text-blue-50" href="">
              Privacy
            </Link>
          </p>
        </div>
        <div className=" hidden lg:!block w-1/2 bg-green-500 shrink-0"></div>
      </div>
    </AuthProvider>
  );
};

export default OnboardingLayout;
