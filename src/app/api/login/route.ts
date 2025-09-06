import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const RAILS = process.env.RAILS_API_URL!;
const COOKIE = process.env.JWT_COOKIE_NAME || 'bb_jwt';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const railsRes = await fetch(`${RAILS}/users/sign_in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ user: { email, password } }),
  });

  if (!railsRes.ok) {
    const text = await railsRes.text().catch(() => '');
    return NextResponse.json({ error: 'Invalid credentials', detail: text }, { status: 401 });
  }

  // Devise-JWT typically returns "Authorization: Bearer <token>"
  const authHeader = railsRes.headers.get('Authorization') || railsRes.headers.get('authorization');
  const token = authHeader?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return NextResponse.json({ error: 'JWT not returned by API' }, { status: 500 });
  }

  const isProd = process.env.NODE_ENV === 'production';
  cookies().set(COOKIE, token, {
    httpOnly: true,
    secure: isProd,   // secure only in prod; localhost is fine without
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ ok: true });
}
