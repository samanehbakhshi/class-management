import React, { useState } from "react";
import { Student } from "@/types/student";
import ConfirmModal from "@/components/ConfirmModal";
import toast from "react-hot-toast";
import { PencilSquareIcon, TrashIcon, XIcon } from "@/assets/icon/Icons";
import DataTable, { Column } from "@/components/table/DataTable";
// import { useDeleteClass } from "../hooks/useDeleteClass";
import Link from "next/link";
import { User } from "@/types/user";
import { cn } from "@/lib/utils/cn";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import UserForm from "./UserForm";
import useDeleteUser from "../hooks/useDeleteUser";

interface UsersTableProps {
  users: Student[];
  isError: boolean;
  isLoading: boolean;
  // setModalOpen: (open: boolean) => void;
  // setEditId: (studentId: number | null) => void;
}

const columns: Column<User>[] = [
  { key: "id", label: "ردیف", render: (_, index) => index + 1 },
  {
    key: "first_name",
    label: "کلاس",
    render: (data) => data.first_name + data.last_name,
  },
  { key: "role", label: "عنوان" },
  { key: "email", label: "نمره" },
  {
    key: "is_active",
    label: "فعال بودن",
    render(data) {
      return (
        <span
          className={cn(
            "",
            data?.is_active ? "text-green-700" : "text-red-500"
          )}
        >
          {data.is_active ? "فعال" : "غیرفعال"}
        </span>
      );
    },
  },
  {
    key: "detail",
    label: "جزئیات",
    render: (row) => (
      <Link
        href={`/classes/${row.id}`}
        className="text-blue-600 hover:underline"
      >
        مشاهده جلسات
      </Link>
    ),
  },
];

export default function UsersTable({
  users,
  isError,
  isLoading,
}: UsersTableProps) {
  const { mutate: removeStudent, isPending } = useDeleteUser();
  // Local States
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  // Event Hanlders
  const handleConfrim = (id: number) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };
  const handleDelete = () => {
    if (!selectedId) return;
    removeStudent(selectedId, {
      onSuccess: () => {
        toast.success("کاربر با موفقیت حذف شد.");
      },
      onError: () => {
        toast.error("حذف کاربر با خظا مواجه شد!");
      },
    });
    setConfirmOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;
  console.log(users);

  if (!users || users.length === 0) return <p>No classes found.</p>;

  return (
    <>
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
      <DataTable
        data={users}
        columns={columns}
        actions={(s) => (
          <>
            <button
              className=" mr-2"
              onClick={() => {
                setEditId(s.id);
                setIsModalOpen(true);
              }}
            >
              <PencilSquareIcon />
            </button>
            <button
              className="text-red-400 mr-1"
              onClick={() => handleConfrim(s.id)}
              // disabled={isPending}
            >
              <TrashIcon />
            </button>
          </>
        )}
      />

      {/*  Modal for Add/Edit User */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editId={editId ?? undefined}
        />
      </Modal>

      {confirmOpen && (
        <ConfirmModal
          isOpen={confirmOpen}
          title="حذف کلاس"
          description="آیا از حذف کاربر اطمینان دارید؟"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
