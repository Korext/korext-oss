import { NextResponse } from 'next/server';

// Query our own registry API to get real attestation data for the package
async function lookupAttestation(ecosystem, pkgName) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://oss.korext.com';
    const res = await fetch(`${baseUrl}/api/registry/${ecosystem}/${pkgName}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall through to defaults
  }
  return { ai_percentage: 0, governance_tier: 'NONE' };
}

function tierColor(tier) {
  switch (tier) {
    case 'FULL': return '#2ea043';
    case 'GOVERNED': return '#2ea043';
    case 'MODERATE': return '#d29922';
    case 'MINIMAL': return '#e3b341';
    case 'NONE': return '#4c1';
    default: return '#4c1';
  }
}

function generateBadgeSVG(ecosystem, pkgName, pct, tier) {
  const label = 'AI Attestation';
  const value = `${pct}% ${tier}`;
  const color = tierColor(tier);

  // Calculate widths based on text length
  const labelWidth = Math.max(label.length * 6.5 + 10, 85);
  const valueWidth = Math.max(value.length * 6.5 + 10, 55);
  const totalWidth = labelWidth + valueWidth;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
  <linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
  <clipPath id="a"><rect width="${totalWidth}" height="20" rx="3" fill="#fff"/></clipPath>
  <g clip-path="url(#a)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${color}"/>
    <rect width="${totalWidth}" height="20" fill="url(#b)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
    <text x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${label}</text>
    <text x="${labelWidth / 2}" y="14">${label}</text>
    <text x="${labelWidth + valueWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${value}</text>
    <text x="${labelWidth + valueWidth / 2}" y="14">${value}</text>
  </g>
</svg>`;
}

export async function GET(request, context) {
  const { ecosystem, name } = await context.params;
  const pkgName = name.join('/');

  const data = await lookupAttestation(ecosystem, pkgName);
  const pct = typeof data.ai_percentage === 'number' ? data.ai_percentage.toFixed(0) : '0';
  const tier = data.governance_tier || 'NONE';

  const svg = generateBadgeSVG(ecosystem, pkgName, pct, tier);

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
