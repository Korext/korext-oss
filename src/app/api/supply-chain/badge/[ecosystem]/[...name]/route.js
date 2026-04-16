import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { ecosystem, name } = params;
  const pkgName = name.join('/');

  // Placeholder SVG generation
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="20">
    <rect width="90" height="20" fill="#555"/>
    <rect x="90" width="70" height="20" fill="#4c1"/>
    <text x="45" y="14" fill="#fff" text-anchor="middle" font-family="Verdana,sans-serif" font-size="11">AI Attestation</text>
    <text x="125" y="14" fill="#fff" text-anchor="middle" font-family="Verdana,sans-serif" font-size="11">0% NONE</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
