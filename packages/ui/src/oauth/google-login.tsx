/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ComponentProps } from "react";
import { cn } from "../utils/misc";
import { TbBrandGoogle } from "react-icons/tb";

interface GoogleButtonProps extends ComponentProps<"button"> {
  text?: string;
  isLoading?: boolean;
  className?: string;
  handleLogin?: (token: string) => void;
  handleError?: (error: any) => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function GoogleButton({ isLoading, className, handleLogin, handleError, text, ...rest }: GoogleButtonProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  //   const setAuth = useAuthStore((state) => state.setAuth);
  //   const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isScriptLoaded && window.google && !rest.disabled) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(document.getElementById("googleButton")!, {
        theme: "outline",
        size: "large",
      });
      window.google.accounts.id.prompt();
    }
  }, [isScriptLoaded]);

  const handleGoogleResponse = async (response: any) => {
    try {
      setIsGoogleLoading(true);
      if (response.credential) {
        handleLogin?.(response.credential);
      }
    } catch (error) {
      handleError?.(error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (window.google) {
      //   window.google.accounts.id.prompt();
      // console.log(document.getElementById("googleButton"));
      const button = document.querySelector('#googleButton [role="button"]') as HTMLElement;
      button?.click();
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
        disabled={isLoading || isGoogleLoading || !isScriptLoaded || rest.disabled}
        onClick={handleGoogleLogin}
      >
        <TbBrandGoogle className="" size={18} />
        {text || "Login in with Google"}
      </button>
      <div id="googleButton" style={{ display: "none" }}></div>
    </div>
  );
}
