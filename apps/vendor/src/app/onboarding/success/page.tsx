"use client";
import notificationService from "@/services/notification.service";
import { useBaseStore } from "@/store/hook";
import React, { useEffect, useState } from "react";

const OnboardingSuccessPage = () => {
  const [status, setStatus] = useState<"success" | "error" | "loading">("loading");
  const { popupNotification, user, clearNotifications } = useBaseStore((store) => store);
  useEffect(() => {
    if (!popupNotification) return;
    if (popupNotification?.action === "business-registration:failed") {
      setStatus("error");
    }
    if (popupNotification?.action === "business-registration:success") {
      setStatus("success");
    }
    notificationService.readNotification({
      userId: user?.id!,
      notificationId: popupNotification.id,
    });
    return () => {
      clearNotifications();
    };
  }, [popupNotification, user]);

  if (status === "success") {
    return <div className="">Business creation successfull</div>;
  }
  if (status === "error") {
    return <div className="">There was an error creating business</div>;
  }
  return <div className="">Busines creation in progress</div>;
};

export default OnboardingSuccessPage;
