import { getSession, getUserId } from "../auth/session";
import supabase from "../supabase/server/supabase";

export async function getTodos() {
  const sessionToken = await getSession();
  if (!sessionToken) {
    return [];
  }
  const userId = await getUserId(sessionToken);
  //handle this
  //   if (!userId) {
  //     return null;
  //   }
  const { data: todos } = await supabase
    .from("todos")
    .select("todo_id, todo,isCompleted")
    .eq("user_id", userId);
  return todos;
}
