"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import useToast from "@/context/toast";

const ProviderContent = () => {
  // const { getModal } = useModal();
  const { getToast } = useToast();
  // const { getNotification } = useNotification()

  return (
    <>
      {getToast()}
      {/* {getModal()} */}
      {/* {getNotification()} */}
    </>
  );
};

export default ProviderContent;
