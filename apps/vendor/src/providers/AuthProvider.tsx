"use client";
import notificationService from "@/services/notification.service";
import userService from "@/services/user.service";
import { useBaseStore } from "@/store/hook";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { use, useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, setUser } = useBaseStore((state) => state);
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: userService.getLoggedInUser,
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (!accessToken) {
      const redirectUrl = encodeURIComponent(pathname);
      router.replace(`/auth/login?redirect=${redirectUrl}`);
    }
  }, [accessToken, pathname]);

  useEffect(() => {
    if (isError) {
      const redirectUrl = encodeURIComponent(pathname);
      router.replace(`/auth/login?redirect=${redirectUrl}`);
    }
    if (isSuccess && data) {
      setUser(data.data!);
      notificationService.connect();
      notificationService.getNotifications({ userId: data.data?.id! });
    }

    return () => {
      notificationService.removeConnection();
    };
  }, [isError, isSuccess, data]);

  return <>{children}</>;
};

export default AuthProvider;
