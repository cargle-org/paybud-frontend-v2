import React, { ComponentProps } from "react";
import { cn } from "../utils/misc";
import Spinner from "../extra/spinner";

export interface ButtonProps extends ComponentProps<"input"> {
  variant?: "brand" | "outline" | "base" | "destructive-outline" | "destructive" | "success" | "inverse";
  text: string;
  isLoading?: boolean;
}

const FormSubmit = (props: ButtonProps) => {
  const { variant = "brand", text, className, isLoading, ...rest } = props;
  return (
    <div className="p-1.5">
      {variant === "brand" && (
        <div className=" relative">
          <input
            type="submit"
            role="button"
            value={text}
            disabled={isLoading || rest.disabled}
            {...rest}
            className={cn(
              " bg-electric-blue-50 py-2 w-full px-4 rounded-lg text-sm text-white font-semibold hover:shadow hover:shadow-blue-30 disabled:bg-gray-80 disabled:text-gray-60 active:inset-shadow-2xs active:inset-shadow-blue-30 cursor-pointer",
              className
            )}
          />
          {isLoading && <Spinner size="sm" disabled className="absolute right-2 top-1/2 transform -translate-y-1/2" />}
        </div>
      )}
    </div>
  );
};

export default FormSubmit;
