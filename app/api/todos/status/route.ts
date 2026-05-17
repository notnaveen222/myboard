import supabase from "@/app/lib/supabase/server/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { todoId, todoStatus } = body;
  const { error } = await supabase
    .from("todos")
    .update({ isCompleted: todoStatus })
    .eq("todo_id", todoId);
  if (error) {
    return NextResponse.json({
      message: "Failed to update todo status",
      success: false,
    });
  }
  return NextResponse.json({ message: "Updadted todo status", success: true });
}
