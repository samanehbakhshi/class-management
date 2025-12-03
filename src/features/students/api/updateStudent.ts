
import supabase from "@/src/lib/services/supabaseClient";
import type { StudentFormValues } from "../validation";

export async function updateStudentApi(
  id: number,
  payload: Partial<StudentFormValues>
) {
  const { data, error } = await supabase
    .from("students")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
