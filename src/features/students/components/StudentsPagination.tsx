import React from 'react'
import { StudentPaginationProps } from '../types';

export default function StudentsPagination({
  page,
  limit,
  total,
  onPageChange,
}: StudentPaginationProps) {
    const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      {/* Previous */}
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <span>
        Page {page} of {totalPages}
      </span>

      {/* Next */}
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
