import supabase from "@/lib/services/supabaseClient";

export async function updateSessionNote(
  sessionId: number,
  note: string
) {
  const { data, error } = await supabase
    .from("sessions")
    .update({ note: note })
    .eq("id", sessionId)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}
