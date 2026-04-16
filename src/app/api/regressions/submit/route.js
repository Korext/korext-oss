import { NextResponse } from 'next/server';
import { submitRegressionPattern } from '@/lib/regression-storage';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Server-side validation would go here
    const result = await submitRegressionPattern(data);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid submission format' }, { status: 400 });
  }
}
