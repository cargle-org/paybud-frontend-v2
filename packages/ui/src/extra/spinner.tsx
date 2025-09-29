import React, { ComponentProps } from "react";
import { cn } from "../utils/misc";

interface SpinnerProps extends ComponentProps<"svg"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
}

const Spinner = (props: SpinnerProps) => {
  const { size = "md", disabled = false, className, ...rest } = props;

  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  return (
    <svg
      viewBox="0 0 50 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "animate-spin", // Infinite spinning animation
        sizeClasses[size],
        disabled && "opacity-50",
        className
      )}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25 10C27.7614 10 30 7.76142 30 5C30 2.23858 27.7614 0 25 0C22.2386 0 20 2.23858 20 5C20 7.76142 22.2386 10 25 10Z"
        fill="currentColor"
        // className="opacity-75"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25 53C27.7614 53 30 50.7614 30 48C30 45.2386 27.7614 43 25 43C22.2386 43 20 45.2386 20 48C20 50.7614 22.2386 53 25 53Z"
        fill="currentColor"
        // className="opacity-25"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45 43C47.7614 43 50 40.7614 50 38C50 35.2386 47.7614 33 45 33C42.2386 33 40 35.2386 40 38C40 40.7614 42.2386 43 45 43Z"
        fill="currentColor"
        // className="opacity-50"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45 21C47.7614 21 50 18.7614 50 16C50 13.2386 47.7614 11 45 11C42.2386 11 40 13.2386 40 16C40 18.7614 42.2386 21 45 21Z"
        fill="currentColor"
        // className="opacity-75"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 43C7.76142 43 10 40.7614 10 38C10 35.2386 7.76142 33 5 33C2.23858 33 0 35.2386 0 38C0 40.7614 2.23858 43 5 43Z"
        fill="currentColor"
        // className="opacity-50"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 21C7.76142 21 10 18.7614 10 16C10 13.2386 7.76142 11 5 11C2.23858 11 0 13.2386 0 16C0 18.7614 2.23858 21 5 21Z"
        fill="currentColor"
        // className="opacity-25"
      />
    </svg>
  );
};

export default Spinner;
