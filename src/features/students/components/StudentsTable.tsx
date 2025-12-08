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

interface StudentTableProps {
  students: Student[];
  isError: boolean;
  isLoading: boolean;
  setModalOpen: (open: boolean) => void;
  setEditId: (studentId: number | null) => void;
}

export default function StudentsTable({
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
      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="min-w-[120px] text-left">ردیف</TableHead>
            <TableHead className="p-2 text-gray-800">نام و نام خانوادگی</TableHead>
            {/* <TableHead className="p-2 text-gray-800">Student ID</TableHead> */}
            <TableHead className="p-2 text-gray-800">ایمیل</TableHead>
            <TableHead className="p-2 text-gray-800">تلفن</TableHead>
            <TableHead className="p-2 text-gray-800">جنسیت</TableHead>
            <TableHead className="p-2 text-gray-800">تاریخ تولد</TableHead>
            <TableHead className="p-2 text-gray-800">شهر</TableHead>
            <TableHead className="p-2 text-gray-800">عملیات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((s: Student, index: number) => (
            <TableRow
              key={s.id}
              className="text-center text-base font-medium text-dark dark:text-white"
            >
              <TableCell className=" text-gray-800 dark:text-dark-6">
                {index + 1}
              </TableCell>
              <TableCell className="p-2">
                {s.first_name} {s.last_name}
              </TableCell>
              <TableCell className="p-2">{s.id}</TableCell>
              <TableCell className="p-2">{s.national_id}</TableCell>
              <TableCell className="p-2">{s.phone}</TableCell>
              <TableCell className="p-2">{s.phone}</TableCell>
              <TableCell className="p-2">{s.province}</TableCell>

              <TableCell className="p-2">
                <button
                  className=" mr-2"
                  onClick={() => {
                    setEditId(s.id);
                    setModalOpen(true);
                  }}
                >
                  <PencilSquareIcon/>
                </button>
                <button
                  className="text-red-400 mr-1"
                  onClick={() => handleConfrim(s.id)}
                  disabled={isPending}
                >
                  <TrashIcon/>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
