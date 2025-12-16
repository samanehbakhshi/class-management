import supabase from "@/lib/services/supabaseClient";
import { AttendanceStatus } from "@/types/attendance";

export async function updateAttendance(
  id: number,
  status: Partial<{status: AttendanceStatus}>
) {
  const { data, error } = await supabase
    .from("attendance")
    .update({"status" : status})
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}
