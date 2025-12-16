import supabase from "@/lib/services/supabaseClient";

export async function getSessionById (sessionId : number){
    const { data: session, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionId)
      .single();
    if (error) {
      console.error("PRC error", error);
      throw new Error(error.message);
    }
    return session ?? [];
}