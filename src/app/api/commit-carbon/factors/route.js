import { NextResponse } from 'next/server';

const FACTORS = {
  methodology_version: '1.0',
  last_updated: '2026-04-15',
  tools: [
    { id: 'copilot', name: 'GitHub Copilot', central_ws_per_1k: 130, category: 'completion' },
    { id: 'cursor', name: 'Cursor', central_ws_per_1k: 163, category: 'completion' },
    { id: 'claude-code', name: 'Claude Code', central_ws_per_1k: 217, category: 'agent' },
    { id: 'codeium', name: 'Codeium', central_ws_per_1k: 108, category: 'completion' },
    { id: 'aider', name: 'Aider', central_ws_per_1k: 163, category: 'agent' },
    { id: 'codex-cli', name: 'OpenAI Codex CLI', central_ws_per_1k: 163, category: 'agent' },
    { id: 'gemini-code-assist', name: 'Gemini Code Assist', central_ws_per_1k: 141, category: 'completion' },
    { id: 'windsurf', name: 'Windsurf', central_ws_per_1k: 163, category: 'completion' },
    { id: 'tabnine', name: 'Tabnine', central_ws_per_1k: 87, category: 'completion' },
    { id: 'devin', name: 'Devin', central_ws_per_1k: 271, category: 'agent' },
    { id: 'openhands', name: 'OpenHands', central_ws_per_1k: 217, category: 'agent' },
    { id: 'amazon-q', name: 'Amazon Q Developer', central_ws_per_1k: 130, category: 'completion' },
    { id: 'jetbrains-ai', name: 'JetBrains AI Assistant', central_ws_per_1k: 130, category: 'completion' },
    { id: 'sourcegraph-cody', name: 'Sourcegraph Cody', central_ws_per_1k: 141, category: 'completion' },
    { id: 'replit-ai', name: 'Replit AI', central_ws_per_1k: 130, category: 'completion' },
    { id: 'cline', name: 'Cline', central_ws_per_1k: 190, category: 'agent' },
    { id: 'continue', name: 'Continue', central_ws_per_1k: 130, category: 'completion' },
    { id: 'gpt-engineer', name: 'GPT Engineer', central_ws_per_1k: 217, category: 'agent' },
    { id: 'bolt', name: 'Bolt', central_ws_per_1k: 217, category: 'agent' },
  ],
  sources: [
    'Luccioni et al. 2023, Power Hungry Processing',
    'Patterson et al. 2021, Carbon Emissions and Large Neural Network Training',
    'IEA Emissions Factors 2024',
    'EPA eGRID 2022',
  ],
  methodology_url: 'https://oss.korext.com/commit-carbon/methodology',
  license: 'CC0 1.0 Universal (public domain)',
};

export async function GET() {
  return NextResponse.json(FACTORS, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
