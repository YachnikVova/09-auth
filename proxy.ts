import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));
  const isAuth = authRoutes.some((r) => pathname.startsWith(r));

  if (!accessToken && refreshToken) {
    const { headers } = await checkSession();
    const setCookie = headers['set-cookie'];
    if (setCookie) {
      const res = isAuth
        ? NextResponse.redirect(new URL('/profile', request.url))
        : NextResponse.next();
      const arr = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const str of arr) {
        const p = parse(str);
        const opts = {
          expires: p.Expires ? new Date(p.Expires) : undefined,
          path: p.Path,
          maxAge: p['Max-Age'] ? Number(p['Max-Age']) : undefined,
        };
        if (p.accessToken) res.cookies.set('accessToken', p.accessToken, opts);
        if (p.refreshToken) res.cookies.set('refreshToken', p.refreshToken, opts);
      }
      return res;
    }
  }

  const isLoggedIn = Boolean(accessToken || refreshToken);
  if (!isLoggedIn && isPrivate) return NextResponse.redirect(new URL('/sign-in', request.url));
  if (isLoggedIn && accessToken && isAuth)
    return NextResponse.redirect(new URL('/profile', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
