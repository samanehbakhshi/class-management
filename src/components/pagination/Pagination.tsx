"use client";
import { PaginationProps } from "@/types";
import React from "react";

export default function Pagination({
  page,
  limit,
  total,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      {/* Next */}
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border text-gray-7 dark:text-gray-3 rounded disabled:opacity-50"
      >
        بعد
      </button>
      {/* Page Numbers */}
      <span className="text-gray-7 dark:text-gray-3">
        صفحه {page} از {totalPages}
      </span>

      {/* Previous */}
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border text-gray-7 dark:text-gray-3 rounded disabled:opacity-50"
      >
        قبل
      </button>
    </div>
  );
}
