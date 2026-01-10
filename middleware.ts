import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoggedIn = Boolean(
    request.cookies.get("admin_session")?.value
  );

  // BELUM LOGIN → DILARANG MASUK ADMIN
  if (pathname.startsWith("/admin") && !isLoggedIn) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  // SUDAH LOGIN → JANGAN BALIK KE LOGIN
  if (pathname === "/auth/login" && isLoggedIn) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
