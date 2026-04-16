import { NextResponse } from 'next/server';
import { searchRegressions } from '@/lib/regression-storage';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  // Note: in a real implementation we would parse all filters
  const patterns = await searchRegressions(q);
  
  return NextResponse.json(patterns);
}
