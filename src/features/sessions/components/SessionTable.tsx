import DataTable, { Column } from "@/components/table/DataTable";

interface SessionsTableProps {
  sessions: any[];
}

export default function SessionsTable({ sessions }: SessionsTableProps) {
    const columns: Column<Student>[] = [
      { key: "id", label: "ردیف", render: (_, index) => index + 1 },
      { key: "class_id", label: "کلاس" },
      { key: "date", label: "تاریخ" },
      { key: "session_count", label: "تعداد جلسات" },
      { key: "end_time", label: "تاریخ شروع" },
      { key: "start_time", label: "زمان شروع" },

    ];
  if (!sessions || sessions.length === 0)
    return <p>No sessions yet.</p>;

  return(
      <DataTable
            data={sessions}
            columns={columns}
            actions={(s) => (
              <>
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
    
  )
}