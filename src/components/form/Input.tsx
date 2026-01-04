import { cn } from "@/lib/utils/cn";
import React from "react";

type InputProps = {
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ error, className, ...props }: InputProps) {
  const baseClasses =
    "w-full rounded-lg  placeholder:text-right border-[1.5px] border-stroke bg-white outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:text-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary px-5.5 py-3 text-gray-6  placeholder:text-dark-6 dark:text-gray-3";

  return (
    <>
      <input
        className={cn(baseClasses, className)}
        {...props}
        dir="auto"
      ></input>
      {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
    </>
  );
}
