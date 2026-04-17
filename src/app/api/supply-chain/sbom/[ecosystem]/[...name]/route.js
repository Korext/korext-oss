import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const { ecosystem, name } = await context.params;
  const pkgName = name.join('/');
  const { searchParams } = new URL(request.url);
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

  // Default to CycloneDX
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
