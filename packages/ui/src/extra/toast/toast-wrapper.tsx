import React from "react";
import Toast, { ToastProps } from "./toast";

const ToastWrapper: React.FC<{
  closeToast: (id: string) => void;
  data: Omit<ToastProps, "closeToast">[];
}> = (props) => {
  const { closeToast, data } = props;
  return (
    <aside className=" fixed z-[100] top-0 right-0 flex flex-col w-full md:w-auto gap-4 p-5">
      {data.map((toastData) => (
        <Toast key={toastData.id} {...toastData} closeToast={closeToast} />
      ))}
    </aside>
  );
};

export default ToastWrapper;
