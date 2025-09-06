import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const RAILS = process.env.RAILS_API_URL!;
const COOKIE = process.env.JWT_COOKIE_NAME || 'bb_jwt';

export async function GET() {
  const token = cookies().get(COOKIE)?.value;

  const res = await fetch(`${RAILS}/api/v1/breweries`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: 'no-store',
  });

  const text = await res.text();
  try {
    const json = JSON.parse(text);
    return NextResponse.json(json, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Upstream not JSON', body: text }, { status: 502 });
  }
}
