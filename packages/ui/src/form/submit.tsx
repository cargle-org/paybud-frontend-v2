import React, { ComponentProps } from "react";
import { cn } from "../utils/misc";

export interface ButtonProps extends ComponentProps<"input"> {
  variant?: "brand" | "outline" | "base" | "destructive-outline" | "destructive" | "success" | "inverse";
  text: string;
}

const FormSubmit = (props: ButtonProps) => {
  const { variant = "brand", text, className, ...rest } = props;
  return (
    <div className="p-1.5">
      {variant === "brand" && (
        <input
          type="submit"
          role="button"
          value={text}
          {...rest}
          className={cn(
            " bg-electric-blue-50 py-2 w-full px-4 rounded-lg text-sm text-white font-semibold hover:shadow hover:shadow-blue-30 disabled:bg-gray-80 disabled:text-gray-60 active:inset-shadow-2xs active:inset-shadow-blue-30 cursor-pointer",
            className
          )}
        />
      )}
    </div>
  );
};

export default FormSubmit;
