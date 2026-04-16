import { NextResponse } from 'next/server';
import { getRegressionPattern } from '@/lib/regression-storage';

export async function GET(request, { params }) {
  const { id } = params;
  const pattern = await getRegressionPattern(id);
  
  if (!pattern) {
    return NextResponse.json({ error: 'Pattern not found' }, { status: 404 });
  }
  
  return NextResponse.json(pattern);
}
