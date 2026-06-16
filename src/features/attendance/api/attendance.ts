import { Attendance } from "@/types/attendance";
import { GetAttendanceParams } from "../types";
import { supabase } from "../../../../app/lib/supabase/client";
export async function getAttendances({
  search = "",
  page = 1,
  limit = 10,
  filters = {},
}: GetAttendanceParams): Promise<{ data: Attendance[]; total: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("attendance")
    .select("*", { count: "exact" })
    .range(from, to);

  // ----S EARCH ----
  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,national_id.ilike.%${search}%`,
    );
  }

  // ---- FILTERING ----
  if (filters.class_id) {
    query = query.eq("class_id", `%${filters.class_id}%`);
  }
  if (filters.province) {
    query = query.ilike("province", `%${filters.province}%`);
  }
  if (filters.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { data: data as Attendance[], total: count ?? 0 };
}
