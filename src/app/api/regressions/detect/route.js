import { NextResponse } from 'next/server';
import { detectPatternsInCode } from '@/lib/regression-storage';

export async function POST(request) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: 'Code field is required' }, { status: 400 });
    }
    
    const matches = await detectPatternsInCode(code);
    return NextResponse.json({ matches });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
