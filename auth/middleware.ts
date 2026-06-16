import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Public routes
  const publicRoutes = ['/', '/auth/login', '/auth/error', '/api/auth'];
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  if (isPublic) return NextResponse.next();

  // Protected routes
  if (!isLoggedIn) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes
  const adminRoutes = ['/admin'];
  const isAdminOnly = adminRoutes.some((r) => pathname.startsWith(r));
  if (isAdminOnly && role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
