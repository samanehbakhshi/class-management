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
import useDeleteUser from "@/features/users/hooks/useDeleteUser";
import UserForm from "@/features/users/components/UserForm";

interface UsersTableProps {
  users: Student[];
  isError: boolean;
  isLoading: boolean;
  setModalOpen: (open: boolean) => void;
  setEditId: (studentId: number | null) => void;
}

const columns: Column<User>[] = [
  { key: "id", label: "ردیف", render: (_, index) => index + 1 },
  {
    key: "first_name",
    label: "نام",
    render: (data) => data.first_name + data.last_name,
  },
//   { key: "role", label: "عنوان" },
  { key: "email", label: "ایمیل" },
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

];

export default function TeachersTable({
  users,
  isError,
  isLoading,
  setModalOpen,
  setEditId,
}: UsersTableProps) {
  const { mutate: removeStudent, isPending } = useDeleteUser();
  // Local States
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // Event Hanlders
  const handleConfrim = (id: number) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };
  const handleDelete = () => {
    if (!selectedId) return;
    removeStudent(selectedId, {
      onSuccess: () => {
        toast.success("معلم با موفقیت حذف شد.");
      },
      onError: () => {
        toast.error("حذف معلم با خظا مواجه شد!");
      },
    });
    setConfirmOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;


  if (!users || users.length === 0) return <p className="text-gray-7 dark:text-gray-2 p-2">معلم یافت نشد!</p>;

  return (
    <>
      <DataTable
        data={users}
        columns={columns}
        actions={(s) => (
          <div className="flex gap-2">
            <button
              className=" mr-2"
              onClick={() => {
                setEditId(s.id);
                setModalOpen(true);
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
          </div>
        )}
      />

      {confirmOpen && (
        <ConfirmModal
          isOpen={confirmOpen}
          title="حذف معلم"
          description="آیا از حذف معلم اطمینان دارید؟"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
