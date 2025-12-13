import { cn } from "@/lib/utils/cn";
import React from "react";

export default function TableContainer({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card",
        className
      )}
    >
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
