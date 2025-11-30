import { Attendance } from "@/src/types/attendance";
import supabase from "../../../lib/services/supabaseClient";

export async function getAttendances(): Promise<Attendance[]> {
  const { data: attendance, error } = await supabase
    .from("attendance")
    .select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return attendance;
}
