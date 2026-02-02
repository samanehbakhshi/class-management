
import { createSupabaseServerClient } from "../../../../app/lib/supabase/server";
import { GetClassesParams } from "../types";
import { Class } from "@/types/class";



export async function getClassServer({
  search = "",
  page = 1,
  limit = 10,
  filters = {},
}: GetClassesParams): Promise<{ data: Class[]; total: number }> {
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
