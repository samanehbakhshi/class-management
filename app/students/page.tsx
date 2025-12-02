"use client";
import StudentsFilters from "@/src/features/students/components/StudentsFilter";
import StudentsPagination from "@/src/features/students/components/StudentsPagination";
import StudentsTable from "@/src/features/students/components/StudentsTable";
import useDebounce from "@/src/features/students/hooks/useDebounce";
import { useStudents } from "@/src/features/students/hooks/useStudents";
import { useState } from "react";
const initialPageLimit = 2;

export default function StudentsPage() {
  // Local UI States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialPageLimit);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({} as {city?: string; class_id?: number});

  const debouncedSearch = useDebounce(search, 400);

  // React Query Fetch
  const {
    data: students,
    isLoading,
    isError,
  } = useStudents({ page, limit, search: debouncedSearch, filters });

  // Handlers (search, filters...)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // reset page when searching
  };

  // HandlersFilters
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(e);
    setPage(1);
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
          <StudentsFilters onChange={handleFilterChange} filters={filters} />

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
        <StudentsTable
          students={students?.data || []}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
      {/* Pagination */}
      {students?.total && (
        <StudentsPagination
          page={page}
          limit={limit}
          total={students?.total}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      {/* TODO: Modal for Add/Edit Student */}
      {/* <StudentFormModal /> */}
    </div>
  );
}
