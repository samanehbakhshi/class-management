import { createSupabaseServerClient } from "../../../../app/lib/supabase/server";



export async function getTeachersServer(params) {
  const supabase = await createSupabaseServerClient();

  const { data, count, error } = await supabase
    .from("users")
    .select("*", { count: "exact" })
    .eq("role", "teacher");

  if (error) throw error;

  return { data, total: count ?? 0 };
}
