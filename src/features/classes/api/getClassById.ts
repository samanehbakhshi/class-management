import supabase from "@/lib/services/supabaseClient";

export async function getClassById(id: number) {
  const { data: student, error } = await supabase
    .from("classes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("PRC error", error);
    throw new Error(error.message);
  }
  return student ?? [];
}
