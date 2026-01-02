"use client";

import { useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import RequireRole from "@/components/auth/RequireRole";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useTeachers } from "../hooks/useTeachers";
import UsersTable from "@/features/users/components/UsersTable";
import Modal from "@/components/Modal";
import UserForm from "@/features/users/components/UserForm";
import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
import Input from "@/components/form/Input";
import StudentsFilters from "@/features/students/components/StudentsFilter";
import TeachersTable from "./TeacherTable";
import TeacherForm from "./TeacherForm";
import useDebounce from "@/features/students/hooks/useDebounce";
type UserClientProps = {
  initialData: { data: []; total: number };
  initialPage: number;
  limit: number;
};
export default function TeacherClient({ initialData, initialPage, limit }: UserClientProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(search, 400)
  const { data, isLoading, isError } = useTeachers({
    page,
    limit,
    search: debouncedSearch,
    filters,
    initialData,
  });
  console.log(data?.data);

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
    <div className="space-y-4">
      {/* Page Title */}
      <div> معلم ها</div>
      {/* <RequireRole role="admin"> */}
        {/* Search + Filters + Add Button */}
        <div className="flex md:flex-row flex-col  items-center justify-between gap-4">
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
            <StudentsFilters onChange={handleFilterChange} filters={filters} />

            {/* Add Button */}
            <Button
              label="افزودن"
              className=""
              variant={"primary"}
              shape={"rounded"}
              // TODO: open modal
              onClick={() => {
                setIsModalOpen(true);
                setEditId(null);
              }}
            />
          </div>
        </div>
        {/* Add Button */}

        <TeachersTable
          users={data?.data ?? []}
          isLoading={isLoading}
          isError={isError}
          setEditId={setEditId}
          setModalOpen={setIsModalOpen}
        />

        <Pagination
          page={page}
          total={data?.total ?? 0}
          limit={limit}
          onPageChange={setPage}
        />

        {/*  Modal for Add/Edit User */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TeacherForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            editId={editId ?? undefined}
          />
        </Modal>
      {/* </RequireRole> */}
    </div>
  );
}
