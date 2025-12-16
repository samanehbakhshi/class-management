import { AttendanceStatus } from "@/types/attendance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendance } from "../api/updateAttendance";

export function useUpdateAttendanceStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      note,
    }: {
      id: number;
      status?:  AttendanceStatus ;
      note?: string;
    }) => updateAttendance(id, {status, note}),
    onSuccess: () => {
      qc.invalidateQueries(["attendance"]);
    },
  });
}
