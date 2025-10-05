/* eslint-disable react/display-name */
import React from "react";
import DatePicker from "react-datepicker";
import { cn } from "../utils/misc";
import { IoBan, IoCalendar, IoReturnUpBack } from "react-icons/io5";

interface FormDatePickerProps {
  date?: Date;
  onChange?: (date: Date | null) => void;
  onBlur?: (e: any) => void;
  label?: string;
  name: string;
  placeholder?: string;
  maxDate?: Date;
  minDate?: Date;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  isDirty?: boolean;
  handleClickReturn?: () => void;
}

const FormDatePicker = (props: FormDatePickerProps) => {
  const { label, date, onChange, placeholder, name, maxDate, minDate, disabled, error, onBlur, isDirty, required } = props;
  return (
    <div className={cn(isDirty && !error && " bg-blue-95", " p-1.5 relative")}>
      {label && (
        <label className=" text-sm text-gray-20 font-semibold" htmlFor={name}>
          {label} {required && <span className=" text-xs text-pink-40 font-normal">*</span>}
        </label>
      )}
      {isDirty && !error && <IoReturnUpBack onClick={props.handleClickReturn} size={18} className="absolute top-1 right-1.5 text-electric-blue-40" />}
      <div className="relative">
        {error && <IoBan size={18} className=" text-pink-50 absolute left-2.5 top-1/2 transform -translate-y-1/2 z-[2]" />}
        <DatePicker
          onBlur={onBlur}
          disabled={disabled}
          name={name}
          id={name}
          selected={date}
          customInput={<CustomInput />}
          className={cn(
            " bg-white placeholder:text-gray-40 text-gray-20 rounded-lg border border-gray-40 w-full px-2 py-1.5 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-blue-15 focus:outline-none disabled:border-gray-40 disabled:bg-gray-95 resize-none",
            error && "pl-8 bg-pink-90 border-pink-40"
            //   leftIcon && "pl-8",
            //   className
          )}
          onChange={(date: Date | null) => onChange?.(date)}
          //   dateFormat="MMM dd, YYYY"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          wrapperClassName=" w-full"
          maxDate={maxDate}
          minDate={minDate}
          placeholderText={placeholder || label}
        />
      </div>
      {error && <span className=" text-xs text-pink-40">{error}</span>}
    </div>
  );
};

const CustomInput = React.forwardRef<any, any>((props, ref) => {
  return (
    <div className=" relative ">
      <input {...props} />
      <IoCalendar
        role="button"
        onClick={props.onClick}
        size={16}
        className={cn(" absolute right-2.5 top-1/2 transform -translate-y-1/2 text-blue-40", props.disabled && " text-gray-40")}
      />
    </div>
  );
});

export default FormDatePicker;
