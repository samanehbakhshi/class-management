import DataTable, { Column } from "@/components/table/DataTable";
import { Session } from "@/types/session";
import Link from "next/link";

interface SessionsTableProps {
  sessions: Session[];
}

export default function SessionsTable({ sessions }: SessionsTableProps) {
    const columns: Column<Session>[] = [
      { key: "id", label: "ردیف", render: (_, index) => index + 1 },
      { key: "class_id", label: "کلاس" },
      { key: "date", label: "تاریخ" },
      { key: "session_count", label: "تعداد جلسات" },
      { key: "end_time", label: "تاریخ شروع" },
      { key: "start_time", label: "زمان شروع" },
      {
        key: "detail",
        label: "جزئیات",
        render: (row) => (
          <Link
            href={`/classes/${row.class_id}/sessions/${row.id}/attendance`}
            className="text-blue-600 hover:underline"
          >
            مشاهده جلسه
          </Link>
        ),
      },
    ];
  if (!sessions || sessions.length === 0)
    return <p className="text-gray-7 dark:text-gray-2 p-2">جلسه‌ای یافت نشد.</p>;

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