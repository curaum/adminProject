// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 예시: 쿠키에 "token"이 있으면 로그인된 것으로 판단
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("accessToken")?.value;

  // 로그인 상태일 때 /login 접근 시 /notice로 리다이렉트
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/notice", req.url));
  }

  // 로그인되지 않은 상태에서 /notice 접근 시 /login으로 리다이렉트
  if (pathname.startsWith("/notice") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 그 외는 그대로
  return NextResponse.next();
}

// Middleware를 적용할 경로 범위 지정
export const config = {
  matcher: "/:path*",
};
