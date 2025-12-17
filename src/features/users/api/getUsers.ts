import { GetUsersParams } from "../types";
import { User } from "@supabase/supabase-js";
import supabase from "@/lib/services/supabaseClient";


export async function getUsers({
  search = "",
  page = 1,
  limit = 10,
  filters = {},
}: GetUsersParams): Promise<{ data: User[]; total: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  let query = supabase
    .from("users")
    .select("*", { count: "exact" })
    .range(from, to);

  // ----S EARCH ----
  if (search) {
    query = query.or(
      `name.ilike.%${search}%,grade.ilike.%${search}%,teacher.ilike.%${search}%`
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
  return { data: data as User[], total: count ?? 0 };
}
