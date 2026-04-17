import { NextResponse } from 'next/server';

// Query-param based route: /api/sc-sbom?ecosystem=npm&name=lodash&format=cyclonedx
// Avoids catch-all [...name] which fails through Google Frontend proxy
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ecosystem = searchParams.get('ecosystem') || 'npm';
  const pkgName = searchParams.get('name') || 'unknown';
  const format = searchParams.get('format') || 'cyclonedx';

  if (format === 'spdx') {
    return NextResponse.json({
      spdxVersion: "SPDX-2.3",
      packages: [{
        name: pkgName,
        annotations: [{
          annotationType: "OTHER",
          annotator: "Tool: korext-supply-check",
          annotationComment: "korext:ai_percentage=0.0; korext:governance_tier=NONE"
        }]
      }]
    });
  }

  return NextResponse.json({
    bomFormat: "CycloneDX",
    specVersion: "1.6",
    components: [{
      name: pkgName,
      properties: [
        { name: "korext:ai_percentage", value: "0.0" },
        { name: "korext:governance_tier", value: "NONE" }
      ]
    }]
  });
}
