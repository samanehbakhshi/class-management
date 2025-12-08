import { cn } from "@/lib/utils/cn";
import React from "react";

type SelectProps = {
  className?: string;
  error?: string;
  defaultOPtion?: string;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  className,
  options,
  defaultOPtion,
  error,
  ...props
}: SelectProps) {
  const baseClasses =
    "w-full  rounded-lg border border-stroke bg-transparent px-2 py-4 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6 pl-1.5";
  return (
    <div className="min-w-12">
      <select {...props} className={cn(className, baseClasses)}>
        <option value={""} >{defaultOPtion}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
    </div>
  );
}
