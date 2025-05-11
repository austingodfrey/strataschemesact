import { NextResponse } from 'next/server';

export function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  const url = request.nextUrl.clone();
  const cookies = request.cookies;
  const sessionUser = cookies.get('session_user');

  // 🔒 Block basic scraping bots
  const botPatterns = ['curl', 'wget', 'python', 'scrapy', 'axios', 'node-fetch'];
  const isBot = botPatterns.some(bot => ua.toLowerCase().includes(bot));

  if (isBot) {
    console.warn("Bot blocked:", ua);
    return new Response("Access denied", { status: 403 });
  }

  // 🔁 Redirect rule
  if (url.pathname === "/blocked") {
    return NextResponse.redirect(new URL('/denied', request.url));
  }

  // 🔐 Require auth for protected routes
  const protectedPaths = ['/api/feedbackform', '/admin'];

  const isProtected = protectedPaths.some(path =>
    url.pathname.startsWith(path)
  );

  if (isProtected && !sessionUser) {
    return NextResponse.redirect(new URL('/page6.html', request.url)); // redirect to login
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/feedbackform',
    '/blocked',
    '/admin/:path*',
  ],
};
