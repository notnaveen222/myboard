import { SupabaseClient } from "@supabase/supabase-js";

export default async function createSession(
  supabase: SupabaseClient,
  userId: string,
) {
  const token = crypto.randomUUID();
  try {
    const { data, error } = await supabase
      .from("session")
      .insert({ user_id: userId, token: token });
    return token;
  } catch (error) {
    console.log("Error creating a session");
  }
}
