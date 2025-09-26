/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ComponentProps } from "react";
import { TbBrandFacebook } from "react-icons/tb";
import { cn } from "../utils/misc";

interface FacebookButtonProps extends ComponentProps<"button"> {
  text?: string;
  isLoading?: boolean;
  className?: string;
  handleLogin?: (token: string) => void;
  handleError?: (error: any) => void;
}

declare global {
  interface Window {
    FB?: {
      init: (params: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
      login: (callback: (response: any) => void, params: { scope: string }) => void;
    };
    fbAsyncInit?: () => void;
  }
}

export function FacebookButton({ isLoading, className, handleError, handleLogin, text, ...rest }: FacebookButtonProps) {
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (rest.disabled) return;
    // Check if script is already loaded
    if (document.querySelector('script[src*="connect.facebook.net"]')) {
      setIsScriptLoaded(true);
      return;
    }

    // Initialize Facebook SDK
    window.fbAsyncInit = () => {
      window.FB?.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
        cookie: true,
        xfbml: true,
        version: "v20.0",
      });
      setIsScriptLoaded(true);
    };

    // Load the SDK asynchronously
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      delete window.fbAsyncInit;
    };
  }, []);

  const handleFacebookLogin = async () => {
    try {
      if (!window.FB) {
        throw new Error("Facebook SDK not loaded");
      }
      setIsFacebookLoading(true);
      const response = await new Promise((resolve, reject) => {
        window.FB?.login(
          (response) => {
            if (response.authResponse) {
              resolve(response.authResponse);
            } else {
              reject(new Error("User cancelled login or did not fully authorize"));
            }
          },
          { scope: "email,public_profile" }
        );
      });

      handleLogin?.((response as any).accessToken);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      handleError?.(error);
    } finally {
      setIsFacebookLoading(false);
    }
  };

  return (
    <div className="p-1.5">
      <button
        type="button"
        className={cn(
          " bg-electric-blue-50 py-2 w-full px-8 rounded-lg text-sm text-white font-semibold hover:shadow hover:shadow-blue-30 disabled:bg-gray-80 disabled:text-gray-60 active:inset-shadow-2xs active:inset-shadow-blue-30 cursor-pointer flex items-center justify-center gap-2",
          className
        )}
        {...rest}
        disabled={isLoading || isFacebookLoading || !isScriptLoaded || rest.disabled}
        onClick={handleFacebookLogin}
      >
        <TbBrandFacebook className="" size={18} />
        {text || "Login in with Facebook"}
      </button>
    </div>
  );
}
