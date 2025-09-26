import React, { ComponentProps } from "react";
import { cn } from "../utils/misc";
import { ClassValue } from "clsx";

export interface SepratorProps extends ComponentProps<"div"> {
  label?: string;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  isVertical?: boolean;
  labelClass?: ClassValue;
}

const Seperator = (props: SepratorProps) => {
  const { spacing = "md", isVertical, label, labelClass, className, ...rest } = props;
  return (
    <>
      {isVertical ? (
        <div className=" ">
          <span className=""></span>
        </div>
      ) : (
        <div className={cn("h-px w-full relative bg-gray-80 ", spacing === "md" ? " my-4" : spacing === "sm" ? "my-3" : "", className)} {...rest}>
          {label && (
            <span
              className={cn(
                "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 z-10 text-sm text-gray-80",
                labelClass
              )}
            >
              {label}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Seperator;
