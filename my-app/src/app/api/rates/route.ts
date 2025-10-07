import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const base = searchParams.get('base') || 'EUR';
    const url = `https://api.vatcomply.com/rates?base=${encodeURIComponent(base)}`;
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: 'Bad response from upstream' }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
