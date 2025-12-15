import supabase from "@/lib/services/supabaseClient";

export async function getSessionByClassId(classId: number){
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("class_id", classId)
      .order("date", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
}