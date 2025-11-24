import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const protectedRoutes = ["/dashboard"];
const publicRoutes = [
  "/",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.user &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  runtime: "nodejs",
}
