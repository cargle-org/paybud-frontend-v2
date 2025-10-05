import React, { ComponentProps } from "react";
import { cn } from "../utils/misc";
import { IoBan, IoReturnUpBack } from "react-icons/io5";

export interface FormInputProps extends ComponentProps<"textarea"> {
  name: string;
  label?: string;
  error?: string;
  isLoading?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDirty?: boolean;
  handleClickReturn?: () => void;
}

const FormTextArea = (props: FormInputProps) => {
  const { name, label, error, leftIcon, isDirty, className, rows = 8, ...rest } = props;
  return (
    <div className={cn(isDirty && !error && " bg-blue-95", " p-1.5 relative")}>
      {label && (
        <label className=" text-sm text-gray-20 font-semibold" htmlFor={name}>
          {label} {rest.required && <span className=" text-xs text-pink-40 font-normal">*</span>}
        </label>
      )}
      {isDirty && !error && <IoReturnUpBack onClick={props.handleClickReturn} size={18} className="absolute top-1 right-1.5 text-electric-blue-40" />}

      <div className="relative">
        {error && <IoBan size={18} className=" text-pink-50 absolute left-2.5 top-1/2 transform -translate-y-1/2" />}
        {leftIcon && <div className=" absolute left-2.5 top-1/2 transform -translate-y-1/2">{leftIcon}</div>}
        <textarea
          rows={rows}
          id={name}
          name={name}
          className={cn(
            " bg-white placeholder:text-gray-40 text-gray-20 rounded-lg border border-gray-40 w-full px-2 py-1.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-blue-15 focus:outline-none disabled:border-gray-40 disabled:bg-gray-95 resize-none",
            error && "pl-8 bg-pink-90 border-pink-40",
            leftIcon && "pl-8",
            className
          )}
          {...rest}
        />
      </div>
      {error && <span className=" text-xs text-pink-40">{error}</span>}
    </div>
  );
};

export default FormTextArea;
