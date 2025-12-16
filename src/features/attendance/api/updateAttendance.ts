import supabase from "@/lib/services/supabaseClient";
import { AttendanceStatus } from "@/types/attendance";

export async function updateAttendance(
  id: number,
  payload: Partial<{status: AttendanceStatus ; note: string}>
) {
  const { data, error } = await supabase
    .from("attendance")
    .update(payload)
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}
