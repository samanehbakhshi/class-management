
import { createSupabaseServerClient } from "../../../../app/lib/supabase/server";
import { Attendance } from "@/types/attendance";
import { GetStudentsParams } from "../types";



export async function getStudentsServer({
  search = "",
  page = 1,
  limit = 10,
  filters = {},
}: GetStudentsParams): Promise<{ data: Attendance[]; total: number }> {
  const supabase = await createSupabaseServerClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("students")
    .select("*", { count: "exact" })
    .range(from, to);
  // .eq("role", "teacher");

  if (error) throw error;

  return { data, total: count ?? 0 };
}
