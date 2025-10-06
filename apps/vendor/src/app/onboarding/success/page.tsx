"use client";
import notificationService from "@/services/notification.service";
import { useBaseStore } from "@/store/hook";
import React, { useEffect, useState } from "react";

const OnboardingSuccessPage = () => {
  const [status, setStatus] = useState<"success" | "error" | "loading">("loading");
  const { notifications, user, clearNotifications, clearOnboardingDetails } = useBaseStore((store) => store);

  useEffect(() => {
    notificationService.getNotifications({ userId: user?.id!, isRead: true });
  }, []);

  useEffect(() => {
    console.log({ notifications });
    const businessRegistrationNotification = notifications?.find((n) => n.action.startsWith("business-registration"));
    if (!businessRegistrationNotification) return;
    if (businessRegistrationNotification?.action === "business-registration:failed") {
      setStatus("error");
    }
    if (businessRegistrationNotification?.action === "business-registration:success") {
      setStatus("success");
      clearOnboardingDetails();
    }
    notificationService.readNotification({
      userId: user?.id!,
      notificationId: businessRegistrationNotification.id,
    });
    return () => {
      clearNotifications();
    };
  }, [notifications]);

  if (status === "success") {
    return <div className="">Business creation successfull</div>;
  }
  if (status === "error") {
    return <div className="">There was an error creating business</div>;
  }
  return <div className="">Busines creation in progress</div>;
};

export default OnboardingSuccessPage;
