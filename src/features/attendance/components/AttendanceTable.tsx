"use client"
import DataTable, { Column } from "@/components/table/DataTable";
import { AttendanceRow } from "@/types/attendance";
import AttendanceStatusSelect from "./AttendanceStatusSelect";
import AttendanceStatusBadge from "./AttendanceStatusBadge";
import { useUpdateAttendanceStatus } from "../hooks/useUpdateAttendanceStatus";
import { useState } from "react";
import { updateAttendance } from "../api/updateAttendance";
import EditableCell from "@/components/table/EditableCell";

interface AttendanceTableProps {
  attendance: AttendanceRow[];
  isError: boolean;
  isLoading: boolean;
  setModalOpen: (open: boolean) => void;
  setEditId: (studentId: number | null) => void;
}

export default function AttendanceTable({
  attendance,
  isError,
  isLoading,
  setModalOpen,
  setEditId,
}: AttendanceTableProps) {
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [noteValue, setNoteValue] = useState<string>("");

  const updateStatusMutation = useUpdateAttendanceStatus();

  const columns: Column<AttendanceRow>[] = [
    { key: "id", label: "ردیف", render: (_, index) => index + 1 },
    {
      key: "name",
      label: "نام دانش‌آموز",
      render: (row) =>
        `${row?.students?.first_name} ${row?.students?.last_name}`,
    },
    {
      key: "status",
      label: "وضعیت حضور",
      render: (row) => <AttendanceStatusBadge status={row.status} />,
    },
    // {
    //   key: "national_id",
    //   label: "کد ملی",
    //   render: (row) => row.students.national_id,
    // },
    {
      key: "note",
      label: "یادداشت",
      render: (row) => (
        <EditableCell
          rowId={row.id}
          value={row.note || ""}
          onUpdate={(id, newNote) =>
            updateStatusMutation.mutate({ id: id, note: newNote })
          }
          renderDisplay={(val) => val || "-"}
          renderEdit={(val, setVal) => (
            <textarea value={val} onChange={(e) => setVal(e.target.value)} />
          )}
        />
      ),
    },
  ];

  if (!attendance || attendance.length === 0) return <p>موردی یافت نشد.</p>;

  return (
    <DataTable
      data={attendance}
      columns={columns}
      actions={(row) => (
        <>
          <AttendanceStatusSelect
            value={row.status}
            disabled={updateStatusMutation.isPending}
            onChange={(newStatus) =>
              updateStatusMutation.mutate({
                id: row.id,
                status: newStatus,
              })
            }
          />
          {/* <button
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
                </button> */}
        </>
      )}
    />
  );
}
