import { createSupabaseServerClient } from "../../app/lib/supabase/server";


export default async function TestPage() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("get_uid_test");



  return <div>Check server log</div>;
}
