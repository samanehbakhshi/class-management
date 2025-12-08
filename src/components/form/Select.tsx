import { cn } from "@/lib/utils/cn";
import React from "react";

type SelectProps = {
  className?: string;
  error?: string;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  className,
  options,
  error,
  ...props
}: SelectProps) {
  const baseClasses =
    "w-full  rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6 pl-11.5";
  return (
    <div>
      <select {...props} className={cn(className, baseClasses)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
