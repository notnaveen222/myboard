import supabase from "../supabase/server/supabase";
import { cookies } from "next/headers";
export default async function createSession(userId: string) {
  const token = crypto.randomUUID();
  try {
    const { data } = await supabase
      .from("sessions")
      .insert({ user_id: userId, token: token });
    return token;
  } catch (error) {
    console.log("Error creating a session");
  }
}

export async function getUserId(token: string) {
  const { data, error } = await supabase
    .from("sessions")
    .select("user_id")
    .eq("token", token)
    .single();
  //err code for no rec
  if (error && error.code === "PGRST116") {
    return null;
  }
  if (error) {
    throw error;
  }
  return data.user_id;
}

export async function getSession() {
  return (await cookies()).get("token")?.value;
}
