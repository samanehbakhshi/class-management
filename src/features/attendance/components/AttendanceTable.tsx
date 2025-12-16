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
}

export default function AttendanceTable({
  attendance,
}: AttendanceTableProps) {
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [noteValue, setNoteValue] = useState<string>("");

  const updateStatusMutation = useUpdateAttendanceStatus();
  // const handleSaveNote = async (attendanceId: number) => {
  //   try {
  //     await updateAttendance(attendanceId, { note: noteValue }); // mutation
  //     // بعد از ذخیره
  //     setEditingNoteId(null);
  //     // می‌توانیم optimistic update انجام دهیم و state attendance را بروز کنیم
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
    {
      key: "national_id",
      label: "کد ملی",
      render: (row) => row.students.national_id,
    },
    {
      key: "note",
      label: "یادداشت",
      render: (row) => (
        <EditableCell
          rowId={row.id}
          value={row.note || ""}
          onUpdate={(id, newNote) => updateStatusMutation.mutate({id: id, note: newNote})}
          renderDisplay={(val) => val || "-"}
          renderEdit={(val, setVal) => (
            <textarea value={val} onChange={(e) => setVal(e.target.value)} />
          )}
        />
      ),
    },
  ];

  console.log(attendance);
  console.log(attendance);
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
