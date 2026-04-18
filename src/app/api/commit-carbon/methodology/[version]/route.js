import { NextResponse } from 'next/server';

const METHODOLOGIES = {
  '1.0': {
    version: '1.0',
    released: '2026-04-01',
    status: 'current',
    summary: 'Initial methodology. Inference energy estimation with regional grid intensity and conservative bias.',
    calculation: 'commit_emissions = tool_invocations * energy_per_invocation_kwh * grid_intensity_gco2e_per_kwh',
    uncertainty_range: '3x to 5x between low and high estimates',
    scope_alignment: 'GHG Protocol Scope 3, Category 1',
    data_sources: [
      'IEA World Energy Outlook (grid intensity)',
      'EPA eGRID (US subnational)',
      'Luccioni et al. 2023 (inference energy)',
      'Patterson et al. 2021 (carbon accounting)',
    ],
    limitations: [
      'Does not measure training emissions',
      'Does not measure water consumption',
      'Does not measure embodied emissions',
      'Vendor telemetry not available; must estimate invocations',
    ],
    full_document: 'https://oss.korext.com/commit-carbon/methodology',
  },
};

export async function GET(request, { params }) {
  const { version } = await params;

  if (version === 'latest') {
    return NextResponse.json(METHODOLOGIES['1.0'], {
      headers: { 'Cache-Control': 'public, max-age=86400' },
    });
  }

  const methodology = METHODOLOGIES[version];
  if (!methodology) {
    return NextResponse.json(
      {
        error: `Methodology version ${version} not found`,
        available: Object.keys(METHODOLOGIES),
      },
      { status: 404 }
    );
  }

  return NextResponse.json(methodology, {
    headers: { 'Cache-Control': 'public, max-age=86400' },
  });
}
