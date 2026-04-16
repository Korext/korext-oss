import { NextResponse } from 'next/server';
import { getAllRegressionPatterns } from '@/lib/regression-storage';

export async function GET(request, { params }) {
  const { id } = params;
  const patterns = await getAllRegressionPatterns();
  
  const matches = patterns.filter(p => 
    p.detection?.korext_rule_ids?.includes(id) ||
    p.detection?.semgrep_rules?.includes(id) ||
    p.detection?.codeql_queries?.includes(id)
  );

  return NextResponse.json(matches);
}
