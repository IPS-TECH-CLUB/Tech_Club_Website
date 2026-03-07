import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
    const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // If user is trying to access protected routes without auth
    if (!isAuth && (isDashboard || isAdminPage)) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.url),
      );
    }

    // If user is trying to access admin routes without admin role
    if (isAdminPage && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({}) => {
        //access pages without token
        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/((?!api/auth|api/health|_next/static|_next/image|favicon.ico|public).*)'],
};
