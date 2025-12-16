
import supabase from "@/lib/services/supabaseClient";

export async function getAttendanceBySessionId(sessionId: number) {
  const { data: attendance, error } = await supabase
    .from("attendance")
    .select(
      `
    id,
    status,
    student_id,
    note,
    students (
      id,
      first_name,
      last_name,
      national_id
    )
  `
    )
    .eq("session_id", sessionId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  console.log(attendance);
  return attendance ?? [];
}