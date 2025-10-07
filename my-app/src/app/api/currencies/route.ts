import { NextResponse } from 'next/server';

const COMMON_LABELS: Record<string, string> = {
  EUR: 'Euro',
  USD: 'Dollar',
  GBP: 'Pound',
  JPY: 'Yen',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
};

const COMMON_SYMBOLS: Record<string, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
};

export async function GET() {
  try {
    const res = await fetch(`https://api.vatcomply.com/rates?base=EUR`);
    if (!res.ok) return NextResponse.json({ error: 'Upstream error' }, { status: 502 });
    const data = await res.json();
    const codes = Object.keys(data.rates || {});
    const list = codes.map((c: string) => ({
      code: c,
      label: COMMON_LABELS[c] || c,
      symbol: COMMON_SYMBOLS[c] || c,
    }));
    // ensure EUR is included as base
    if (!list.find((x) => x.code === 'EUR')) list.unshift({ code: 'EUR', label: 'Euro', symbol: '€' });
    return NextResponse.json({ currencies: list });
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
