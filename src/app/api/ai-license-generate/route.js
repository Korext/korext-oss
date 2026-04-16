import { parseAttestation } from '@/lib/yaml';
import yaml from 'js-yaml';

function determineLevel(percentage) {
  if (percentage === 0) return 'NONE';
  if (percentage <= 25) return 'LOW';
  if (percentage <= 60) return 'MODERATE';
  if (percentage <= 99) return 'HIGH';
  return 'FULL';
}

function determineTier(governance) {
  if (!governance || !governance.engine) return 'UNGOVERNED';
  if (governance.proof_bundle_url) return 'ATTESTED';
  return 'SCANNED';
}

export async function POST(req) {
  try {
    const { yamlText, owner, repo } = await req.json();
    const data = parseAttestation(yamlText, true);

    if (!data) {
      return Response.json({ error: 'Invalid attestation data' }, { status: 400 });
    }

    const level = determineLevel(data.ai.percentage);
    const tier = determineTier(data.governance);
    
    let toolsText = '';
    if (data.ai.tools && data.ai.tools.length > 0) {
      toolsText = data.ai.tools.map(t => `${t.name} (${t.first_seen} to ${t.last_seen})`).join('\n');
    } else {
      toolsText = 'None declared';
    }

    let governanceText = '';
    if (data.governance && data.governance.engine) {
      governanceText = `Governance Engine: ${data.governance.engine}\nLast Scan: ${data.governance.last_scan || 'Unknown'}\nScore: ${data.governance.score !== null ? data.governance.score : 'Unknown'}/100\nVerification: ${data.governance.proof_bundle_url || 'Unknown'}`;
    } else {
      governanceText = `No automated governance scanning has been configured for this repository.`;
    }

    const textStr = `===============================================
AI LICENSE NOTICE (Version 1.0)
===============================================

This software contains code that was
written with assistance from AI tools.
This notice declares the AI provenance
of the code. It does not grant or
restrict any rights. The primary
software license (shown above or
in a separate LICENSE file) governs
all use of this software.

AI ASSISTED PORTIONS: ${level} (${data.ai.percentage}%)
Assisted Commits: ${data.ai.assisted_commits}
Total Commits: ${data.range ? data.range.commits : 'Unknown'}
Percentage: ${data.ai.percentage}%

AI TOOLS USED:
${toolsText}

HUMAN REVIEW:
All AI assisted commits in this
repository were reviewed and accepted
by human developers who are the
authors of record.

GOVERNANCE:
${governanceText}

VERIFY:
The AI provenance data in this notice
can be verified against the
.ai-attestation.yaml file in the repo
root, or online at:
https://oss.korext.com/report/${owner}/${repo}

LEARN MORE:
https://oss.korext.com/ai-license
Specification: CC0 1.0 (public domain)

===============================================`;

    const yamlObj = {
      schema: 'https://oss.korext.com/ai-license/schema',
      version: '1.0',
      repo: { owner, name: repo },
      notice_generated: new Date().toISOString(),
      attestation_source: '.ai-attestation.yaml',
      ai_provenance: {
        assisted_commits: data.ai.assisted_commits,
        total_commits: data.range ? data.range.commits : 0,
        percentage: data.ai.percentage
      },
      tools_used: data.ai.tools || [],
      human_review: {
        reviewed: true,
        reviewers_of_record: 'developers'
      },
      governance: data.governance || {
        engine: null,
        last_scan: null,
        score: null,
        verification_url: null
      },
      verification: {
        attestation_file: '.ai-attestation.yaml',
        online_report: `https://oss.korext.com/report/${owner}/${repo}`
      },
      specification: {
        url: 'https://oss.korext.com/ai-license',
        license: 'CC0 1.0 Universal'
      }
    };

    return Response.json({ text: textStr, yaml: yaml.dump(yamlObj, { noRefs: true, lineWidth: -1 }) });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
