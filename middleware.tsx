import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {
  const accessToken = request.cookies.get('_acdkb')?.value;
  const googleToken = request.cookies.get('authjs.session-token')?.value;
  const isAuthenticated = accessToken || googleToken; 
  const { pathname } = request.nextUrl;

  if (accessToken && pathname.startsWith('/account')) {
    try {
      const payloadBase64 = accessToken.split('.')[1];
      const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));

      const tokenExpiration = new Date(payload.exp * 1000);

      if (Date.now() >= tokenExpiration.getTime()) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.set('_acdkb', '', { path: '/', expires: new Date(0) });

        return response
      }

    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }



  if (!isAuthenticated && ['/account', '/checkout'].some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/account/:path*', '/login', '/checkout'],
};
