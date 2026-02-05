import { NextRequest, NextResponse } from 'next/server';
import { userService } from './service/user.service';
import { Roles } from './constants/roles';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const userRole = user.role;

  // for admin redirect
  if (userRole === Roles.admin) {
    if (
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/tutor-dashboard')
    ) {
      return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    }
  }

  //for tutor redirect
  if (userRole === Roles.tutor) {
    if (
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/admin-dashboard')
    ) {
      return NextResponse.redirect(new URL('/tutor-dashboard', request.url));
    }
  }

  // for student redirect
  if (userRole === Roles.student) {
    if (
      pathname.startsWith('/tutor-dashboard') ||
      pathname.startsWith('/admin-dashboard')
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/admin-dashboard',
    '/admin-dashboard/:path*',
    '/tutor-dashboard',
    '/tutor-dashboard/:path*',
  ],
};
