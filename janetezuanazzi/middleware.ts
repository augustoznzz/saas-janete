import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = 'student_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  // Protect /aluno routes
  if (pathname.startsWith('/aluno')) {
    if (!hasSession) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect /checkout routes
  if (pathname.startsWith('/checkout')) {
    if (!hasSession) {
      const url = new URL('/criar-conta', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Prevent logged-in users from visiting /login
  if (pathname === '/login' && hasSession) {
    const url = new URL('/aluno/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/aluno/:path*', '/checkout/:path*', '/login'],
};


