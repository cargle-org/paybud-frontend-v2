import React, { ComponentProps, useState } from "react";
import { cn } from "../utils/misc";
import { IoBan, IoEye, IoEyeOff, IoReturnUpBack } from "react-icons/io5";

export interface FormInputProps extends ComponentProps<"input"> {
  name: string;
  label?: string;
  error?: string;
  isLoading?: string;
  optional?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDirty?: boolean;
}

const FormPassword = (props: FormInputProps) => {
  const { name, label, error, optional, leftIcon, isDirty, ...rest } = props;
  const [showText, setShowText] = useState(false);
  return (
    <div className={cn(isDirty && !error && " bg-yellow-95", " p-1.5 relative")}>
      {label && (
        <label className=" text-sm text-gray-20 font-semibold" htmlFor={name}>
          {label}
        </label>
      )}
      {isDirty && !error && <IoReturnUpBack size={18} className="absolute top-1 right-1.5 text-electric-blue-40" />}

      <div className="relative">
        {error && <IoBan size={18} className=" text-pink-50 absolute left-2.5 top-1/2 transform -translate-y-1/2" />}
        <input
          id={name}
          name={name}
          {...rest}
          className={cn(
            " bg-white placeholder:text-gray-40 text-gray-20 rounded-lg border border-gray-40 w-full px-2 py-1.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-blue-15 focus:outline-none disabled:border-gray-40 disabled:bg-gray-95",
            error && "pl-8 bg-pink-90 border-pink-40",
            "pr-8"
          )}
          type={showText ? "text" : "password"}
        />
        {showText ? (
          <IoEye
            role="button"
            onClick={() => setShowText(!showText)}
            className="text-gray-40 absolute right-2.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        ) : (
          <IoEyeOff
            role="button"
            onClick={() => setShowText(!showText)}
            className="text-gray-50 absolute right-2.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
      {error && <span className=" text-xs text-pink-40">{error}</span>}
    </div>
  );
};

export default FormPassword;
