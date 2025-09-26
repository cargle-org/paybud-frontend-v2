import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" w-screen h-screen flex">
      <div className=" w-full  lg:!w-1/2 h-full flex items-center justify-center shrink-0 relative">
        <div className=" w-full max-w-96 mx-auto flex flex-col gap-10 items-center">
          <Image height={362} width={1062} src={"/images/logo.png"} alt="logo" className="w-40" />
          {children}
        </div>
        <p className=" w-full text-center px-2 absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-50">
          © 2025 Salesforce, Inc. All rights reserved. |{" "}
          <Link className=" text-blue-50" href="">
            Privacy
          </Link>
        </p>
      </div>
      <div className=" hidden lg:block w-1/2 bg-green-500 shrink-0"></div>
    </div>
  );
};

export default AuthLayout;
