import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const { ecosystem, name } = await context.params;
  // If the URL is meant to have a version at the end, it will be the last element of the name array
  // Example: /api/registry/npm/lodash/4.17.21 -> name: ['lodash', '4.17.21']
  // We can parse it here. For simplicity in v1.0, we just join it.
  
  const pkgName = name.join('/');
  
  const data = {
    ecosystem,
    name: pkgName,
    attestation_source: "registry",
    ai_percentage: 0.0,
    governance_tier: "NONE",
    tools: []
  };

  return NextResponse.json(data);
}
