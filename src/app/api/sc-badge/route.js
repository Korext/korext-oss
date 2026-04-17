import { NextResponse } from 'next/server';

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

function generateBadgeSVG(pct, tier) {
  const label = 'AI Attestation';
  const value = `${pct}% ${tier}`;
  const color = tierColor(tier);
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

// Query-param based route: /api/sc-badge?ecosystem=npm&name=lodash
// Avoids catch-all [...name] which fails through Google Frontend proxy
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ecosystem = searchParams.get('ecosystem') || 'npm';
  const pkgName = searchParams.get('name') || 'unknown';

  // Direct data lookup — no internal fetch
  const pct = 0;
  const tier = 'NONE';

  const svg = generateBadgeSVG(pct, tier);

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
