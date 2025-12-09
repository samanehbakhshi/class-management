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
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}
