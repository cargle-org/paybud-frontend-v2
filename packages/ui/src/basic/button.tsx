import React, { ComponentProps } from "react";
import { cn } from "../utils/misc";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "brand" | "outline" | "base" | "destructive-outline" | "destructive" | "success" | "inverse";
  text: string;
}

const Button = (props: ButtonProps) => {
  const { variant = "brand", text, className, ...rest } = props;
  return (
    <>
      {variant === "brand" && (
        <button
          role="button"
          {...rest}
          className={cn(
            " bg-electric-blue-50 py-1.5 px-4 rounded-full text-sm text-white font-semibold hover:shadow hover:shadow-blue-30 disabled:bg-gray-80 disabled:text-gray-60 active:inset-shadow-2xs active:inset-shadow-blue-30 cursor-pointer",
            className
          )}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
