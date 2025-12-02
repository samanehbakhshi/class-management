import supabase from "@/src/lib/services/supabaseClient";

export async function getClasses() {
  const { data: classes, error } = await supabase.from("classes").select("*");

  if (error) {
    console.log(error.message)
    throw new Error(error.message);
  }
  return classes;
}

export async function getDistinctCities(){
    const { data: cities, error } = await supabase.rpc("get_distinct_cities");
    if(error){
        console.error("PRC error", error)
        throw new Error (error.message)
    }
    return cities ?? [];
}