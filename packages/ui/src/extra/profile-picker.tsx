import React, { useEffect, useState } from "react";
import { IoPencil } from "react-icons/io5";
import { cn } from "../utils/misc";

interface ProfilePickerProps {
  handleFileChange?: (file: File) => void;
  handleError?: (error: string) => void;
  fileUrl?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  options?: {
    maxFileSizeMB?: number;
    acceptedFileTypes?: string[];
  };
}

const ProfilePicker: React.FC<ProfilePickerProps> = ({
  handleFileChange,
  handleError,
  fileUrl,
  options = { acceptedFileTypes: ["image/*"], maxFileSizeMB: 5 },
  size = "md",
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const sizeClasses = {
    xs: "w-12 h-12",
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (!inputRef.current) return;
    function handleChange(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      if (options?.maxFileSizeMB && file.size > options.maxFileSizeMB * 1024 * 1024) {
        handleError?.(`File size exceeds the maximum limit of ${options.maxFileSizeMB} MB`);
        return;
      }
      if (options?.acceptedFileTypes && !options.acceptedFileTypes.includes(file.type)) {
        handleError?.("Unsupported file type");
        return;
      }
      handleFileChange?.(file);
      setImage(file || null);
    }

    inputRef.current.addEventListener("change", handleChange);

    return () => {
      if (!inputRef.current) return;
      inputRef.current.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <>
      <div className=" flex flex-col items-center gap-2">
        {fileUrl || image ? (
          <div className={cn("rounded-full bg-gray-95 relative flex", sizeClasses[size])}>
            <img
              loading="lazy"
              src={image ? URL.createObjectURL(image) : fileUrl}
              alt="Profile"
              className="rounded-full object-contain w-full h-full"
            />
            <div
              onClick={handleClick}
              role="button"
              className=" absolute right-0 bottom-0 shadow rounded-full w-6 h-6 bg-white text-gray-30 flex items-center justify-center border border-gray-95 cursor-pointer"
            >
              <IoPencil />
            </div>
          </div>
        ) : (
          <div className={cn("rounded-full bg-gray-95 relative", sizeClasses[size])}>
            <div
              onClick={handleClick}
              role="button"
              className=" cursor-pointer absolute right-2 bottom-0 shadow rounded-full w-6 h-6 bg-white text-gray-30 flex items-center justify-center border border-gray-95"
            >
              <IoPencil size={12} />
            </div>
          </div>
        )}
        <div className="">
          <p className="text-gray-40 text-xs">JPG, PNG or GIF (max. {options?.maxFileSizeMB}MB)</p>
        </div>

        <input ref={inputRef} type="file" accept={options?.acceptedFileTypes?.join(", ") || "image/*"} className="hidden" />
      </div>
    </>
  );
};

export default ProfilePicker;
