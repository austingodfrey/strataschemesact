import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  const url = request.nextUrl.clone();
  const cookies = request.cookies;
  const sessionUser = cookies.get('session_user');

  // 🔒 Block known bots by user agent
  const botPatterns = ['curl', 'wget', 'python', 'scrapy', 'axios', 'node-fetch'];
  const isBot = botPatterns.some(bot => ua.toLowerCase().includes(bot));
  if (isBot) {
    console.warn('Bot blocked:', ua);
    return new Response('Access denied', { status: 403 });
  }

  // 🔁 Redirect rule for demo purposes
  if (url.pathname === '/blocked') {
    return NextResponse.redirect(new URL('/denied', request.url));
  }

  // 🔐 Protect specific routes
  const protectedPaths = ['/apage.html', '/admin'];
  const isProtected = protectedPaths.some(path => url.pathname.startsWith(path));

  if (isProtected && !sessionUser) {
    return NextResponse.redirect(new URL('/page6.html', request.url)); // send to login
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/apage.html',
    '/admin/:path*',
    '/blocked',
    '/api/feedbackform',
  ],
};
