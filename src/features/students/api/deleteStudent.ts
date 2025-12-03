import supabase from "@/src/lib/services/supabaseClient";

export async function deleteStudent(id: number) {
  const { error } = await supabase.from("students").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return true;
}
