import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const COOKIE = process.env.JWT_COOKIE_NAME || 'bb_jwt';

export async function POST() {
  const isProd = process.env.NODE_ENV === 'production';
  cookies().set(COOKIE, '', { httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', maxAge: 0 });
  return NextResponse.json({ ok: true });
}
