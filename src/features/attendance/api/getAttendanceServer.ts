
import { createSupabaseServerClient } from "../../../../app/lib/supabase/server";
import { GetAttendanceParams } from "../types";
import { Attendance } from "@/types/attendance";



export async function getAttendanceServer({
  search = "",
  page = 1,
  limit = 10,
  filters = {},
}: GetAttendanceParams): Promise<{ data: Attendance[]; total: number }> {
  const supabase = await createSupabaseServerClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("classes")
    .select("*", { count: "exact" })
    .range(from, to);
  // .eq("role", "teacher");

  if (error) throw error;

  return { data, total: count ?? 0 };
}
