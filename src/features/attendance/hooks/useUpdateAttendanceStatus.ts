import { AttendanceStatus } from "@/types/attendance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendance } from "../api/updateAttendance";

export function useUpdateAttendanceStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: Partial<{ status: AttendanceStatus }>;
    }) => updateAttendance(id, status),
    onSuccess: () => {
      qc.invalidateQueries(["attendance"]);
    },
  });
}
