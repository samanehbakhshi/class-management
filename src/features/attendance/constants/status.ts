
import { AttendanceStatus } from "@/types/attendance";

export const ATTENDANCE_STATUS_META: Record<
  AttendanceStatus,
  { label: string; className: string }
> = {
  present: {
    label: "حاضر",
    className: "bg-green-100 text-green-800",
  },
  absent: {
    label: "غایب",
    className: "bg-red-100 text-red-800",
  },
  late: {
    label: "دیرآمده",
    className: "bg-yellow-100 text-yellow-800",
  },
  excused: {
    label: "موجه",
    className: "bg-gray-100 text-gray-800",
  },
};
