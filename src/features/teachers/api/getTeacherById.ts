import supabase from "@/lib/services/supabaseClient";

export async function getTeacherById(id: number) {
  const { data: teacher, error } = await supabase
    .from("teachers")
    .select("*")
    .eq("id", id)
    // .single();
  if (error) {
    console.error("PRC error", error);
    throw new Error(error.message);
  }
  return teacher ?? [];
}
