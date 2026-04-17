import { NextResponse } from 'next/server';

// Query-param based route: /api/sc-registry?ecosystem=npm&name=lodash
// Avoids catch-all [...name] which fails through Google Frontend proxy
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ecosystem = searchParams.get('ecosystem') || 'npm';
  const pkgName = searchParams.get('name') || 'unknown';

  return NextResponse.json({
    ecosystem,
    name: pkgName,
    attestation_source: "registry",
    ai_percentage: 0.0,
    governance_tier: "NONE",
    tools: []
  });
}
