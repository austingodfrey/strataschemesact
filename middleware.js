import { NextResponse } from 'next/server';
//edge function by default cause middleware runs on edge uses request.headers 
export function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  const url = request.nextUrl.clone();

  const botPatterns = ['curl', 'wget', 'python', 'scrapy', 'axios', 'node-fetch'];
  const isBot = botPatterns.some(bot => ua.toLowerCase().includes(bot));

  if (isBot) {
    console.warn("🤖 Bot blocked:", ua);
    return new Response("Access denied", { status: 403 });
  }

  if (url.pathname === "/blocked") {
    return NextResponse.redirect(new URL('/denied', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/feedbackform', '/blocked', '/admin/:path*'], 
};