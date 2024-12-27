import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookie } from 'cookies-next/server'

export async function middleware(request: NextRequest) {
  const token = await getCookie('token', { req: request });

  const protectedPaths = ['/purchase']


  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!res.ok) {
      throw new Error('Token inválido')
    }

    if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/purchase', request.url))
  } catch (error) {
    console.error('Error al verificar el token:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}

