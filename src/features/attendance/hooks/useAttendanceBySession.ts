import { useQuery } from "@tanstack/react-query";
import { getAttendanceBySessionId } from "../api/getAttendanceBySessionId";

export function useAttendanceBySession(sessionId: number, initialData: any[]) {
  return useQuery({
    queryKey: ["attendance", sessionId],
    queryFn: () => getAttendanceBySessionId(sessionId),
    initialData,
  });
}
