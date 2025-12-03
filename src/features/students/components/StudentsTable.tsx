import React, { useState } from "react";
import { Student } from "@/src/types/student";
import useDeleteStudents from "../hooks/useDeleteStudents";
import ConfirmModal from "@/src/components/ConfirmModal";
import toast from "react-hot-toast";

interface StudentTableProps {
  students: Student[];
  isError: boolean;
  isLoading: boolean;
  setModalOpen: (open: boolean) => void;
  setEditing: (student: Student | null) => void;
}

export default function StudentsTable({
  students,
  isError,
  isLoading,
  setModalOpen,
  setEditing,
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
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-gray-800">Row</th>
            <th className="p-2 text-gray-800">Full Name</th>
            <th className="p-2 text-gray-800">Student ID</th>
            <th className="p-2 text-gray-800">Email</th>
            <th className="p-2 text-gray-800">Phone</th>
            <th className="p-2 text-gray-800">Gender</th>
            <th className="p-2 text-gray-800">DOB</th>
            <th className="p-2 text-gray-800">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s: Student, index: number) => (
            <tr key={s.id} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                {s.first_name} {s.last_name}
              </td>
              <td className="p-2">{s.id}</td>
              <td className="p-2">{s.national_id}</td>
              <td className="p-2">{s.phone}</td>
              <td className="p-2">{s.phone}</td>
              <td className="p-2">{s.province}</td>

              <td className="p-2">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => {
                    setEditing(s);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleConfrim(s.id)}
                  disabled={isPending}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {confirmOpen && (
        <ConfirmModal
          isOpen={confirmOpen}
          title="Delete Student"
          description="Are you sure you want delete this student?"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
