"use client";
import Button from "@/components/Button";
import Input from "@/components/form/Input";
import Modal from "@/components/Modal";
import Pagination from "@/components/pagination/Pagination";
import TableContainer from "@/components/table/TableContainer";
import ClassForm from "@/features/classes/components/ClassForm";
import ClassTable from "@/features/classes/components/ClassTable";
import { useClasses } from "@/features/classes/hooks/useClasses";
import StudentsFilters from "@/features/students/components/StudentsFilter";

import useDebounce from "@/features/students/hooks/useDebounce";
import { useState } from "react";
const initialPageLimit = 2;

export default function Classes() {
  // Local UI States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialPageLimit);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(
    {} as { city?: string; class_id?: number }
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<null | { id: number }>(null);

  const debouncedSearch = useDebounce(search, 400);

  // React Query Fetch
  const {
    data: students,
    isLoading,
    isError,
  } = useClasses({ page, limit, search: debouncedSearch, filters });

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
      <div>کلاس ها </div>

      {/* Search + Filters + Add Button */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <Input
          type="text"
          placeholder="...جستجو"
          value={search}
          disabled={isLoading}
          onChange={handleSearchChange}
          className="border px-3 py-2 rounded w-64 disabled:bg-gray-200"
        />

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Filters Component */}
          {/* TODO: Create Filter Component */}
          <StudentsFilters onChange={handleFilterChange} filters={filters} />

          {/* Add Button */}
          <Button
            label="افزودن"
            className=""
            variant={"primary"}
            shape={"rounded"}
            // TODO: open modal
            onClick={() => {
              setModalOpen(true);
              setEditId(null);
            }}
          />
        </div>
      </div>
      <TableContainer className="" title={" کلاس ها"}>
        {/* Table Section */}
        <div>
          {isLoading && <p>بارگذاری...</p>}
          {isError && <p>خطا رخ داده اسست.</p>}

          {/* TODO: StudentsTable component */}
          <ClassTable
            students={students?.data || []}
            isLoading={isLoading}
            isError={isError}
            setEditId={setEditId}
            setModalOpen={setModalOpen}
          />
        </div>
        {/* Pagination */}
        {students?.total && (
          <Pagination
            page={page}
            limit={limit}
            total={students?.total}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
      </TableContainer>
      {/* TODO: Modal for Add/Edit Student */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ClassForm
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          editId={editId ?? undefined}
        />
      </Modal>
    </div>
  );
}
