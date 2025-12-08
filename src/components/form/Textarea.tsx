import { cn } from "@/lib/utils/cn";
import React from "react";

type InputProps = {
  error?: string;
  className?: string;
  rows?: number;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ error, className,rows= 4, ...props }: InputProps) {
  const baseClasses =
    "w-full rounded-lg placeholder:text-right border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white";

  return (
    <>
      <textarea
        className={cn(baseClasses, className)}
        {...props}
        dir="auto"
        rows={rows}
        
      ></textarea>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
}
