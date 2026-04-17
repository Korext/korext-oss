import { NextResponse } from 'next/server';

// Emissions factors for calculation (matching commit-carbon CLI factors.yaml).
const TOOL_FACTORS = {
  copilot: { name: 'GitHub Copilot', low: 65, central: 130, high: 260 },
  cursor: { name: 'Cursor', low: 82, central: 163, high: 326 },
  'claude-code': { name: 'Claude Code', low: 108, central: 217, high: 434 },
  codeium: { name: 'Codeium', low: 54, central: 108, high: 217 },
  aider: { name: 'Aider', low: 82, central: 163, high: 326 },
  'codex-cli': { name: 'OpenAI Codex CLI', low: 82, central: 163, high: 326 },
  'gemini-code-assist': { name: 'Gemini Code Assist', low: 70, central: 141, high: 282 },
  windsurf: { name: 'Windsurf', low: 82, central: 163, high: 326 },
  tabnine: { name: 'Tabnine', low: 43, central: 87, high: 174 },
  devin: { name: 'Devin', low: 135, central: 271, high: 542 },
  openhands: { name: 'OpenHands', low: 108, central: 217, high: 434 },
  'amazon-q': { name: 'Amazon Q Developer', low: 65, central: 130, high: 260 },
  'jetbrains-ai': { name: 'JetBrains AI', low: 65, central: 130, high: 260 },
  'sourcegraph-cody': { name: 'Sourcegraph Cody', low: 70, central: 141, high: 282 },
  'replit-ai': { name: 'Replit AI', low: 65, central: 130, high: 260 },
  cline: { name: 'Cline', low: 95, central: 190, high: 380 },
  continue: { name: 'Continue', low: 65, central: 130, high: 260 },
  'gpt-engineer': { name: 'GPT Engineer', low: 108, central: 217, high: 434 },
  bolt: { name: 'Bolt', low: 108, central: 217, high: 434 },
};

const REGION_AVERAGES = {
  US: 369, EU: 241, CN: 543, IN: 628, JP: 462, GB: 195, FR: 58,
  DE: 357, CA: 120, AU: 510, BR: 61, KR: 415, SE: 13, NO: 8,
  IS: 0, NZ: 82, SG: 395, IL: 453, ZA: 709, MX: 418, AR: 301,
  CL: 316, CO: 133, PL: 635, CZ: 395, AT: 93, CH: 16, BE: 145,
  NL: 286, DK: 109, FI: 67, IE: 253, IT: 315, ES: 161, PT: 148,
};

const DEFAULT_TOKENS = 2500;
const AGENT_TOOLS = ['claude-code', 'devin', 'openhands', 'cline', 'gpt-engineer', 'bolt'];
const WORLD_AVG = 475;

function calculate(toolId, commits, region) {
  const factor = TOOL_FACTORS[toolId];
  if (!factor) return null;

  const gridIntensity = REGION_AVERAGES[(region || 'US').toUpperCase()] || WORLD_AVG;
  const tokens = AGENT_TOOLS.includes(toolId) ? DEFAULT_TOKENS * 3 : DEFAULT_TOKENS;
  const batches = tokens / 1000;

  const perCommit = (wsPerBatch) => (wsPerBatch * batches / 3600) * gridIntensity;

  const low = perCommit(factor.low) * commits;
  const central = perCommit(factor.central) * commits;
  const high = perCommit(factor.high) * commits;

  return {
    tool: toolId,
    tool_name: factor.name,
    commits,
    region: (region || 'US').toUpperCase(),
    grid_intensity_gco2e_per_kwh: gridIntensity,
    emissions: {
      total_kgco2e: {
        low: Math.round(low) / 1000,
        central: Math.round(central) / 1000,
        high: Math.round(high) / 1000,
      },
      per_commit_gco2e: {
        low: Math.round(low / commits * 10) / 10,
        central: Math.round(central / commits * 10) / 10,
        high: Math.round(high / commits * 10) / 10,
      },
    },
    methodology: 'commit-carbon v1.0',
    methodology_url: 'https://oss.korext.com/commit-carbon/methodology',
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { tool, commits, region } = body;

    if (!tool || !commits) {
      return NextResponse.json(
        { error: 'Required fields: tool, commits. Optional: region.' },
        { status: 400 }
      );
    }

    if (!TOOL_FACTORS[tool]) {
      return NextResponse.json(
        { error: `Unknown tool: ${tool}. Available: ${Object.keys(TOOL_FACTORS).join(', ')}` },
        { status: 400 }
      );
    }

    const result = calculate(tool, parseInt(commits, 10), region);

    return NextResponse.json(result, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
