import { get, set } from '@/lib/cache';
import { fetchAttestation } from '@/lib/github';

export async function GET(request, context) {
  const { owner, repo } = await context.params;
  const cacheKey = `ail_badge_${owner}_${repo}`;
  
  let svg = get(cacheKey);
  if (svg) {
    return new Response(svg, {
      status: 200,
      headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=3600' },
    });
  }

  // 1. Check for AI-LICENSE file
  let hasLicense = false;
  let licenseText = null;
  const licUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/AI-LICENSE`;
  try {
    const licRes = await fetch(licUrl, { cache: 'no-store' });
    if (licRes.ok) {
      licenseText = await licRes.text();
      hasLicense = true;
    }
  } catch (e) {}

  // 2. Fetch attestation
  const { data, found } = await fetchAttestation(owner, repo);

  let status = 'None';
  let color = '#555';

  if (hasLicense && data) {
    // Determine level/tier from data
    const governance = data.governance || {};
    const percentage = data.ai?.percentage || 0;
    
    let tier = 'UNGOVERNED';
    if (governance.engine) {
       tier = governance.proof_bundle_url ? 'ATTESTED' : 'SCANNED';
    }

    let level = 'FULL';
    if (percentage === 0) level = 'NONE';
    else if (percentage <= 25) level = 'LOW';
    else if (percentage <= 60) level = 'MODERATE';
    else if (percentage <= 99) level = 'HIGH';

    if (tier === 'ATTESTED') {
      status = 'ATTESTED';
      color = '#10b981'; // green
    } else {
      status = level;
      color = '#3b82f6'; // blue
    }
  } else if (found) {
    status = 'Not Declared';
    color = '#eab308'; // yellow
  }

  // Very simple SVG generator (emulating shields.io logic)
  const leftWidth = 65;
  const rightWidth = status.length * 7 + 10;
  const totalWidth = leftWidth + rightWidth;

  svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="AI License: ${status}">
  <title>AI License: ${status}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${leftWidth}" height="20" fill="#555"/>
    <rect x="${leftWidth}" width="${rightWidth}" height="20" fill="${color}"/>
    <rect width="${totalWidth}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
    <text aria-hidden="true" x="${leftWidth * 5}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${(leftWidth - 10) * 10}">AI License</text>
    <text x="${leftWidth * 5}" y="140" transform="scale(.1)" fill="#fff" textLength="${(leftWidth - 10) * 10}">AI License</text>
    <text aria-hidden="true" x="${(leftWidth + (rightWidth / 2)) * 10}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${(rightWidth - 10) * 10}">${status}</text>
    <text x="${(leftWidth + (rightWidth / 2)) * 10}" y="140" transform="scale(.1)" fill="#fff" textLength="${(rightWidth - 10) * 10}">${status}</text>
  </g>
</svg>`.trim();

  set(cacheKey, svg, 3600 * 1000); // 1 hour
  
  return new Response(svg, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=3600' },
  });
}
