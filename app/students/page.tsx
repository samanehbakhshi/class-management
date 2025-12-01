"use client";
import { useStudents } from "@/src/features/students/hooks/useStudents";
import { useState } from "react";
const initialPageLimit = 10;

export default function StudentsPage() {
  // Local UI States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialPageLimit);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  // React Query Fetch
  const {
    data: students,
    isLoading,
    isError,
  } = useStudents({ page, limit, search, filters });

  // Handlers (search, filters...)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // reset page when searching
  };

  console.log(students?.data, students?.total);

  // Render UI
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>Students</div>

      {/* Search + Filters + Add Button */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={handleSearchChange}
          className="border px-3 py-2 rounded w-64"
        />

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Filters Component */}
          {/* TODO: Create Filter Component */}
          {/* <StudentsFilters onChange={handleFilterChange} /> */}

          {/* Add Button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            // TODO: open modal
          >
            Add Student
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading students</p>}

        {/* TODO: StudentsTable component */}
        {/* <StudentsTable data={data?.data || []} /> */}
      </div>

      {/* Pagination */}
      <div className="flex justify-end">
        <div className="flex gap-2 items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm">Page {page}</span>

          <button
            disabled={students && students?.data?.length < limit}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* TODO: Modal for Add/Edit Student */}
      {/* <StudentFormModal /> */}
    </div>
  );
}
