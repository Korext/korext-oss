import { NextResponse } from 'next/server';
import { getRegressionPattern } from '@/lib/regression-storage';

export async function GET(request, context) {
  const { id } = await context.params;
  const pattern = await getRegressionPattern(id);
  
  if (!pattern) {
    return NextResponse.json({ error: 'Pattern not found' }, { status: 404 });
  }
  
  return NextResponse.json(pattern);
}
