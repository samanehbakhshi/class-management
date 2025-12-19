import { cn } from "@/lib/utils/cn";
import React from "react";

type CheckBoxProps = {
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function CheckBox({
  error,
  className,
  ...props
}: CheckBoxProps) {
  const baseClasses = "peer sr-only";

  return (
    <label className="relative inline-block cursor-pointer">
      <input
        type="checkbox"
        className={cn(baseClasses, className)}
        {...props}
      />

      <div className="h-8 w-14 rounded-full bg-[#212B36] dark:bg-dark transition peer-checked:bg-green-500"></div>

      <div className="absolute top-1 left-1 flex size-6 items-center justify-center rounded-full bg-white shadow-switch-1 transition-transform peer-checked:translate-x-6"></div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </label>
  );
}
