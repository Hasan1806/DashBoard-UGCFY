import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleCookie = request.cookies.get('ugcfy_role')?.value;

  // 1. BRAND ROUTE PROTECTION
  if (pathname.startsWith('/brand')) {
    // Public Brand Auth Pages
    if (pathname === '/brand/login' || pathname === '/brand/signup') {
      // If already authenticated as Brand, send directly to dashboard
      if (roleCookie === 'brand') {
        return NextResponse.redirect(new URL('/brand/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Protected Brand Pages
    if (!roleCookie) {
      // Unauthenticated -> Redirect to Brand Login
      return NextResponse.redirect(new URL('/brand/login', request.url));
    }

    // Strict Role Enforcement: Creator attempting to enter Brand area -> Deny & Redirect
    if (roleCookie !== 'brand') {
      return NextResponse.redirect(new URL('/creator/dashboard', request.url));
    }
  }

  // 2. CREATOR ROUTE PROTECTION
  if (pathname.startsWith('/creator')) {
    // Public Creator Auth Pages
    if (pathname === '/creator/login' || pathname === '/creator/signup') {
      // If already authenticated as Creator, send directly to dashboard
      if (roleCookie === 'creator') {
        return NextResponse.redirect(new URL('/creator/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Protected Creator Pages
    if (!roleCookie) {
      // Unauthenticated -> Redirect to Creator Login
      return NextResponse.redirect(new URL('/creator/login', request.url));
    }

    // Strict Role Enforcement: Brand attempting to enter Creator area -> Deny & Redirect
    if (roleCookie !== 'creator') {
      return NextResponse.redirect(new URL('/brand/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/brand/:path*', '/creator/:path*'],
};
