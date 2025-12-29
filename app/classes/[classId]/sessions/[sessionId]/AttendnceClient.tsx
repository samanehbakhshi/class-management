"use client";

import RequireRole from "@/components/auth/RequireRole";
import AttendanceTable from "@/features/attendance/components/AttendanceTable";
import { useAttendanceBySession } from "@/features/attendance/hooks/useAttendanceBySession";
import { AttendanceRow } from "@/types/attendance";

interface Props {
  initialAttendance: AttendanceRow[];
  sessionId: number;
}
export default function AttendanceClient({
  initialAttendance,
  sessionId,
}: Props) {
  const { data: attendance = [] } = useAttendanceBySession(
    sessionId,
    initialAttendance
  );

  return (
    <RequireRole roles={["admin", "teacher"]}>
      <AttendanceTable attendance={attendance} />
    </RequireRole>
  );
}
