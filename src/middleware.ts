import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const path = req.nextUrl.pathname;
  const isPublic = path == "/" || path == "/signup" || path == "/login";

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/profile", req.url));
  } else if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/signup", "/login", "/profile", "/verifyEmail"],
};
