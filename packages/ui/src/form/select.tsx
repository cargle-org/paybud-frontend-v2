import React, { ComponentProps, useState } from "react";
import { cn } from "../utils/misc";
import { IoBan, IoReturnUpBack } from "react-icons/io5";

export interface FormInputProps extends ComponentProps<"select"> {
  name: string;
  label?: string;
  error?: string;
  isLoading?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  handleSelect?: (value: any) => void;
  isDirty?: boolean;
  handleClickReturn?: () => void;
  options?: { label: string; value: any }[];
}

const FormSelect = (props: FormInputProps) => {
  const { name, label, error, leftIcon, isDirty, className, options, ...rest } = props;
  const [selected, setSelected] = useState<any | null>(props.value);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSelect = (value: any) => {
    setSelected(value);
    props.handleSelect?.(value);
    setShowDropdown(false);
  };
  return (
    <div className={cn(isDirty && !error && " bg-blue-95", " p-1.5 relative")}>
      {label && (
        <label className=" text-sm text-gray-20 font-semibold" htmlFor={name}>
          {label} {rest.required && <span className=" text-xs text-pink-40 font-normal">*</span>}
        </label>
      )}
      {isDirty && !error && <IoReturnUpBack onClick={props.handleClickReturn} size={18} className="absolute top-1 right-1.5 text-electric-blue-40" />}

      <div className="relative">
        {error && <IoBan size={18} className=" text-pink-50 absolute left-2.5 top-1/2 transform -translate-y-1/2 z-[2]" />}
        {leftIcon && <div className=" absolute left-2.5 top-1/2 transform -translate-y-1/2">{leftIcon}</div>}
        <div className=" relative ">
          <input
            id={name}
            name={name}
            onClick={(e) => {
              e.preventDefault();
              setShowDropdown(true);
            }}
            type="button"
            placeholder={props.placeholder}
            value={options?.find((value) => value.value === selected)?.label || props.placeholder}
            className={cn(
              " text-left cursor-pointer bg-white placeholder:text-gray-40 text-gray-20 rounded-lg border border-gray-40 w-full px-2 py-1.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-blue-15 focus:outline-none disabled:border-gray-40 disabled:bg-gray-95",
              error && "pl-8 bg-pink-90 border-pink-40",
              showDropdown && " ring-2 ring-offset-1 ring-blue-15",
              !selected && "text-gray-40",
              leftIcon && "pl-8",
              className
            )}
          />
          <div
            className={cn(
              " z-10 absolute top-0 left-0 w-full bg-white rounded-lg p-1 border border-gray-80 shadow max-h-96 overflow-y-auto",
              !showDropdown && "hidden"
            )}
          >
            <ul className="space-y-px">
              {options?.map((option) => (
                <li
                  role="button"
                  key={option.value}
                  className={cn(
                    "px-1.5 py-1 text-sm rounded-[6px] font-medium flex items-center text-gray-15 justify-between hover:bg-[#007AFF] hover:text-white cursor-pointer",
                    selected === option.value && "bg-[#007AFF] text-white"
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <span className="">{option.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {error && <span className=" text-xs text-pink-40">{error}</span>}
    </div>
  );
};

export default FormSelect;
