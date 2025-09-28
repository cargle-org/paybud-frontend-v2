import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "../../utils/misc";
import { IoBan, IoCheckmarkCircle, IoClose, IoInformationCircle, IoWarning } from "react-icons/io5";

gsap.registerPlugin(useGSAP);

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  description?: string;
  showIcon?: boolean;
  duration?: number; // in milliseconds
  id: string;
  closeToast: (id: string) => void;
}
// TODO: fix gsap animation on multiple toasts

const Toast = (props: ToastProps) => {
  const { id, closeToast, type = "info", showIcon = true } = props;
  const [ctx, setCtx] = useState(gsap.context(() => {}));
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setTimeout(() => {
      ctx.close();
    }, 4000);
  };

  useGSAP(() => {
    ctx.add("open", () => {
      gsap.to(badgeRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
        onComplete: () => handleClose(),
      });
    });
    ctx.add("close", () => {
      gsap.to(badgeRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        onComplete: () => closeToast(id),
      });
    });
    ctx.open();
    return () => ctx.revert();
  }, []);
  return (
    <div ref={badgeRef} className=" opacity-0 transform scale-50">
      <div
        className={cn(
          " py-3 pr-11  relative rounded-xl shadow",
          type === "success" ? "bg-teal-90 text-teal-40" : "",
          type === "error" ? "bg-pink-90 text-pink-40" : "",
          type === "info" ? "bg-blue-90 text-blue-40" : "",
          type === "warning" ? "bg-yellow-90 text-yellow-40" : "",
          showIcon ? "pl-14" : "pl-6"
        )}
      >
        {showIcon && type === "success" && <IoCheckmarkCircle size={24} className=" absolute left-6 top-3" />}
        {showIcon && type === "error" && <IoBan size={24} className=" absolute left-6 top-3" />}
        {showIcon && type === "info" && <IoInformationCircle size={24} className=" absolute left-6 top-3" />}
        {showIcon && type === "warning" && <IoWarning size={24} className=" absolute left-6 top-3" />}
        <IoClose role="button" size={20} className=" absolute right-3 top-[14px] cursor-pointer" onClick={() => ctx.close()} />
        <p className=" text-base font-semibold whitespace-nowrap">{props.message}</p>
        <p className=" text-sm">{props.description}</p>
      </div>
    </div>
  );
};

export default Toast;
