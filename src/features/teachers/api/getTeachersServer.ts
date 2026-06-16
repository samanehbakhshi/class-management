import { GetUsersParams } from "@/features/users/types";
import { createSupabaseServerClient } from "../../../../app/lib/supabase/server";
import { User } from "@/types/user";




export async function getTeachersServer({
  search = "",
  page = 1,
  limit = 10,
  filters = {},
}: GetUsersParams): Promise<{ data: User[]; total: number }>  {
  const supabase = await createSupabaseServerClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("teachers")
    .select("*", { count: "exact" })
    .range(from,to)
    // .eq("role", "teacher");

  if (error) throw error;

  return { data, total: count ?? 0 };
}
