import supabase from "@/lib/services/supabaseClient";
import { Session } from "@/types/session";
import { GetSessionByClassIdParams } from "../type";

export async function getSessionByClassId({
  classId,
  page = 1,
  limit = 10,
  search = "",
  filters = {},
}: GetSessionByClassIdParams): Promise<{
  data: Session[];
  total: number;
}> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  let query = supabase
    .from("sessions")
    .select("*", { count: "exact" })
    .eq("class_id", classId)
    .range(from, to);
  // ----S EARCH ----
if (search) {
  query = query.or(`date.ilike.%${search}%,status.ilike.%${search}%`);
}


  // ---- FILTERING ----
if (filters.status) {
  query = query.eq("status", filters.status);
}

if (filters.date) {
  query = query.eq("date", filters.date);
}


  const { data, count, error } = await query;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { data: data as Session[], total: count ?? 0 };
}



