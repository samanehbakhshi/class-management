import React, { useState } from "react";
import { Student } from "@/types/student";
import useDeleteStudents from "../hooks/useDeleteStudents";
import ConfirmModal from "@/components/ConfirmModal";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/Table";
import TableContainer from "@/components/table/TableContainer";
import { PencilSquareIcon, TrashIcon, XIcon } from "@/assets/icon/Icons";
import DataTable, { Column } from "@/components/table/DataTable";

interface StudentTableProps {
  students: Student[];
  isError: boolean;
  isLoading: boolean;
  setModalOpen: (open: boolean) => void;
  setEditId: (studentId: number | null) => void;
}


const columns: Column<Student>[] = [
  { key: "id", label: "ردیف", render: (_, index) => index + 1 },
  { key: "first_name", label: "نام" },
  { key: "last_name", label: "نام خانوادگی" },
  { key: "email", label: "ایمیل" },
  { key: "gender", label: "جنسیت" },
  { key: "phone", label: "تلفن" },
  { key: "province", label: "شهر" },
];

export default function ClassTable({
  students,
  isError,
  isLoading,
  setModalOpen,
  setEditId,
}: StudentTableProps) {
  const { mutate: removeStudent, isPending } = useDeleteStudents();
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
        toast.success("Student deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete student");
      },
    });
    setConfirmOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  if (!students || students.length === 0) return <p>No students found.</p>;

 

  return (
    <>
      <DataTable
        data={students}
        columns={columns}
        actions={(row) => (
          <>
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
              disabled={isPending}
            >
              <TrashIcon />
            </button>
          </>
        )}
      />


      {confirmOpen && (
        <ConfirmModal
          isOpen={confirmOpen}
          title="Delete Student"
          description="Are you sure you want delete this student?"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
