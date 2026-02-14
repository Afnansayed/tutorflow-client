import { Roles } from '@/constants/roles';
import { userService } from '@/service/user.service';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();
  const user = data?.user;
  // console.log({user});

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const userRole = user.role;

  // booking logic
  if (pathname.startsWith('/booking')) {
    if (userRole !== Roles.student) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

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
    '/booking',
    '/booking/:path*',
  ],
};
