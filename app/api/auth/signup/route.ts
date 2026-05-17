import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import hashPassword from "@/app/lib/auth/hashpass";
import createSession from "@/app/lib/auth/session";
export async function POST(req: NextRequest) {
  const supabase = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  );
  const body = await req.json();
  const { name, email, password } = body;
  const { data: alreadyExist } = await supabase
    .from("users")
    .select("name")
    .eq("email", email)
    .single();
  if (alreadyExist) {
    return NextResponse.json(
      { message: "Email already in use." },
      { status: 400 },
    );
  }
  const hashedPassword = await hashPassword(password);
  try {
    const { data } = await supabase
      .from("users")
      .insert({ email: email, hashed_password: hashedPassword, name: name })
      .select();
    if (!data) {
      console.log("Failed Inserting user!");
      throw new Error("Failed to insert user error thrown.");
    }
    const session = await createSession(supabase, data[0].user_id);
    if (!session) {
      console.log("Failed to create session token");
      return NextResponse.json(
        {
          message:
            "User created successfully, but failed to create login, Try Login.",
        },
        { status: 500 },
      );
    }
    const response: NextResponse = NextResponse.json({
      message: "success",
      success: true,
    });
    response.cookies.set("token", session, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error inserting record in supabase!",
      },
      { status: 500 },
    );
  }
}
