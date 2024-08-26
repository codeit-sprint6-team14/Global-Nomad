import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  const isAuthPage = ['/signin', '/signup'].includes(request.nextUrl.pathname);
  const isProtectedPage = request.nextUrl.pathname.startsWith('/my-page');

  if (token && isAuthPage) {
    // 로그인 상태에서 인증 페이지 접근 시 홈으로 리다이렉트
    return NextResponse.redirect(new URL('/?message=already_logged_in', request.url));
  }

  if (!token && isProtectedPage) {
    // 비로그인 상태에서 보호된 페이지 접근 시 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/signin?message=login_required', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/signup', '/my-page/:path*'],
};
