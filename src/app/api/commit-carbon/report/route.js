import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { attestation, format = 'json', region = 'US' } = body;

    if (!attestation) {
      return NextResponse.json(
        { error: 'attestation data required' },
        { status: 400 }
      );
    }

    const aiCommits = attestation?.ai?.assisted_commits || 0;
    const tools = attestation?.ai?.tools || [];

    // Emission calculation using default factors
    const centralPerCommit = 0.0333; // kg CO2e per AI commit (central estimate)
    const total = {
      low: aiCommits * centralPerCommit * 0.5,
      central: aiCommits * centralPerCommit,
      high: aiCommits * centralPerCommit * 2.0,
    };

    const report = {
      schema: 'https://oss.korext.com/commit-carbon/report-schema',
      version: '1.0',
      methodology_version: '1.0',
      generated_at: new Date().toISOString(),
      repo: attestation.repo || {},
      ai_usage: {
        total_commits: attestation?.range?.commits || 0,
        ai_assisted_commits: aiCommits,
        ai_percentage: attestation?.ai?.percentage || 0,
        tools_used: tools.map(t => ({
          name: t.name,
          commits: t.commit_count,
        })),
      },
      emissions_estimate: {
        methodology: 'commit-carbon v1.0',
        total_kgco2e: total,
        per_ai_commit_average_gco2e: {
          low: (total.low / Math.max(aiCommits, 1)) * 1000,
          central: (total.central / Math.max(aiCommits, 1)) * 1000,
          high: (total.high / Math.max(aiCommits, 1)) * 1000,
        },
        grid_context: {
          region,
          data_source: 'iea_2024',
        },
      },
      disclosure_format: format,
    };

    switch (format) {
      case 'csrd':
      case 'sec':
      case 'cdp':
      case 'ghg':
        return NextResponse.json({
          ...report,
          disclosure_format: format,
          compliance_note: `Formatted for ${format.toUpperCase()} disclosure. Scope 3, Category 1.`,
        });
      default:
        return NextResponse.json(report);
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
