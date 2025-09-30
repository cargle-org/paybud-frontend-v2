"use client";
import { useBaseStore } from "@/store/hook";
import React from "react";

const OnboardingUserPage = () => {
  const { onboardingDetails, setUserProfile } = useBaseStore((state) => state);
  return (
    <div className=" w-full">
      <div className="rounded border border-gray-95 p-5 bg-white">
        <div className="flex items-center">
          <div className="">Avatar</div>
        </div>
        <div className=" grid grid-cols-2 gap-4"></div>
      </div>
    </div>
  );
};

export default OnboardingUserPage;
