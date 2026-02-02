"use client"
import Button from '@/components/Button';
import Input from '@/components/form/Input';
import TableContainer from '@/components/table/TableContainer';
import StudentsFilters from '@/features/students/components/StudentsFilter';
import useDebounce from '@/features/students/hooks/useDebounce';
import React, { useState } from 'react'
import { useClasses } from '../hooks/useClasses';
import ClassTable from './ClassTable';
import Pagination from '@/components/pagination/Pagination';
import ClassForm from './ClassForm';
import Modal from '@/components/Modal';

export default function ClassClient({initialData, initialPage, limit: limitNum}) {
  // Local UI States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(limitNum);
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
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>کلاس ها </div>

      {/* Search + Filters + Add Button */}
      <div className="flex md:flex-row flex-col  items-center justify-between gap-4">
        {/* Search */}
        <Input
          type="text"
          placeholder="...جستجو"
          value={search}
          disabled={isLoading}
          onChange={handleSearchChange}
          className="border px-3 py-3  w-64 "
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
