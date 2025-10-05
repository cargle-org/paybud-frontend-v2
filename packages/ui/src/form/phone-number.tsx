import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { FormInputProps } from "./password";
import { cn } from "../utils/misc";
import { IoBan } from "react-icons/io5";

interface FormPhoneNumberInputProps extends FormInputProps {
  handleChange?: (e: string) => void;
}

const FormPhoneNumber: React.FC<FormPhoneNumberInputProps> = (props) => {
  const { name, label, error, isDirty, className, value, handleChange, ...rest } = props;
  // console.log({ value });
  return (
    <div className={cn(isDirty && !error && " bg-blue-95", " p-1.5 relative")}>
      {label && (
        <label className=" text-sm text-gray-20 font-semibold" htmlFor={name}>
          {label} {rest.required && <span className=" text-xs text-pink-40 font-normal">*</span>}
        </label>
      )}
      <div className="relative">
        {error && <IoBan size={18} className=" text-pink-50 absolute left-2.5 top-1/2 transform -translate-y-1/2" />}
        <PhoneInput
          international
          defaultCountry="NG"
          value={(value as string) || ""}
          onChange={(e) => handleChange?.(e || "")}
          numberInputProps={{
            className: "focus-visible:outline-none",
            ...rest,
          }}
          className={cn(
            " bg-white placeholder:text-gray-40 text-gray-20 rounded-lg border border-gray-40 w-full px-2 py-1.5 text-sm focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-blue-15 focus:outline-none disabled:border-gray-40 disabled:bg-gray-95",
            error && "pl-8 bg-pink-90 border-pink-40",
            className
          )}
        />
      </div>

      {error && <span className=" text-xs text-pink-40">{error}</span>}
    </div>
  );
};

export default FormPhoneNumber;
