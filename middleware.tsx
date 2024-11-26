import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest, response : NextResponse) {
    const accessToken = request.cookies.get('_acdkb')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // if(!accessToken && request.nextUrl.pathname.startsWith('/')){
    //   const response =  NextResponse.redirect(new URL('/login', request.url));
    //   response.cookies.set('_acdkb', '', { path: '/', expires: new Date(0) });
    // }


    if(accessToken && request.nextUrl.pathname.startsWith('/account')){
      try {
          const payloadBase64 = accessToken.split('.')[1];
          const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));

          const tokenExpiration = new Date(payload.exp * 1000);
  
          if (Date.now() >= tokenExpiration.getTime()) {
            const response =  NextResponse.redirect(new URL('/login', request.url));
            response.cookies.set('_acdkb', '', { path: '/', expires: new Date(0) });

            return response
          }
    
      } catch (error) {
          return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    if (!accessToken && request.nextUrl.pathname.startsWith('/account')) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      if (!accessToken && request.nextUrl.pathname.startsWith('/checkout')) {
        return NextResponse.redirect(new URL('/login', request.url));
      }


      if (accessToken && request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', request.url));
      }
}

export const config = {
    matcher: ['/account/:path*', '/login', '/checkout'],
};
