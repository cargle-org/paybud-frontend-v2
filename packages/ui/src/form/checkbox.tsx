import { ClassValue } from "clsx";
import React, { ComponentProps } from "react";

export interface FormCheckBoxProps extends ComponentProps<"input"> {
  label?: string;
  name: string;
  labelClass?: ClassValue;
}

const FormCheckBox = (props: FormCheckBoxProps) => {
  const { label, name } = props;
  return (
    <div className=" flex items-center gap-2 p-1.5">
      <input type="checkbox" name={name} id={name} />
      <label htmlFor={name} className=" text-xs">
        {label}
      </label>
    </div>
  );
};

export default FormCheckBox;
