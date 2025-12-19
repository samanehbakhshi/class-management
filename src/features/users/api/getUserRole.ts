import supabase from "@/lib/services/supabaseClient";

export async function getUserRole(){
    const { data, error } = await supabase.from("user_roles").select("role");

    if (error) {
        console.error(error);
        throw new Error(error.message)
    }
    return data
}