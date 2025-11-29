import supabase from "./supabaseClient";


export async function  getStudents() {

    const { data: students, error } = await supabase.from("students").select("*");
    if(error){
        console.error(error)
        throw new Error(error.message)
    }
    return students;
    
}
