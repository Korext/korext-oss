import { NextResponse } from 'next/server';
import { getAllRegressionPatterns } from '@/lib/regression-storage';

export async function GET(request) {
  const patterns = await getAllRegressionPatterns();
  
  // Wrap in a CC BY 4.0 data structure
  const exportData = {
    license: "CC BY 4.0",
    attribution: "Korext Open Source - AI Regression Database",
    timestamp: new Date().toISOString(),
    patterns: patterns
  };

  return NextResponse.json(exportData);
}
