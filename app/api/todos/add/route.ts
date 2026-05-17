import { getSession, getUserId } from "@/app/lib/auth/session";
import supabase from "@/app/lib/supabase/server/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sessionToken = await getSession();
  if (!sessionToken) {
    return NextResponse.json({
      success: false,
      message: "No session found for user.",
    });
  }
  const userId = await getUserId(sessionToken);
  const newTodo = body.todo;
  const { data, error } = await supabase
    .from("todos")
    .insert({
      user_id: userId,
      todo: newTodo,
    })
    .select();
  if (error || !data) {
    return NextResponse.json({ success: false });
  }
  console.log(data);
  return NextResponse.json({ success: true, newTodoId: data[0].todo_id });
}
