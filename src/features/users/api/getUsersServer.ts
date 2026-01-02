
import { createSupabaseServerClient } from "../../../../app/lib/supabase/server";
import { GetUsersParams } from "../types";
import { User } from "@supabase/supabase-js";

export async function getUsersServer({
  search = "",
  page = 1,
  limit = 10,
  filters = {},
}: GetUsersParams): Promise<{ data: User[]; total: number }> {
  const supabase = await createSupabaseServerClient(); // حتما SSR

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("users")
    .select("*", { count: "exact" })
    .range(from, to);

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,grade.ilike.%${search}%,teacher.ilike.%${search}%`
    );
  }

  if (filters.class_id) query = query.eq("class_id", filters.class_id);
  if (filters.province)
    query = query.ilike("province", `%${filters.province}%`);
  if (filters.city) query = query.ilike("city", `%${filters.city}%`);

  const { data, count, error } = await query;

  if (error) throw error;

  return { data: data as User[], total: count ?? 0 };
}
