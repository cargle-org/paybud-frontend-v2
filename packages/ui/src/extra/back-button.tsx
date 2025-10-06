import React, { ComponentProps } from "react";
import { cn } from "../utils/misc";
import { IoChevronBack } from "react-icons/io5";

interface BackButtonProps extends ComponentProps<"button"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const BackButton = (props: BackButtonProps) => {
  const { size = "md", className, ...rest } = props;

  const sizeClasses = {
    // xs: "w-12 h-12",
    // sm: "w-16 h-16",
    md: "w-8 h-8",
    // lg: "w-8 h-8",
    // xl: "w-40 h-40",
  };
  return (
    <button
      className={cn(
        " rounded-full inline-flex items-center justify-center border border-gray-40 text-blue-40 cursor-pointer",
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      <IoChevronBack size={20} />
    </button>
  );
};

export default BackButton;
