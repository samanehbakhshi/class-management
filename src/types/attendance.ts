export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface Attendance {
  id: number;
  session_id: number;
  class_id: number;
  student_id: number;
  status: AttendanceStatus;
  note?: string;
  created_at: string;
}
export interface AttendanceRow {
  id: number;
  student_id: number;
  status: AttendanceStatus;
  note: string;
  students: {
    first_name: string;
    last_name: string;
    national_id: string;
  };
}