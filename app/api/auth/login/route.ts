import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  // HARDCODE AUTH (sementara)
  if (username !== "admin" || password !== "admin") {
    return NextResponse.json(
      { message: "Username atau password salah" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  // SET SESSION
  response.cookies.set("admin_session", "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 jam
    sameSite: "lax",
  });

  return response;
}
