const fs = require('fs');
const path = require('path');

/**
 * Weekly Report Generator for AI Code Radar
 *
 * Produces a markdown document from the current snapshot data.
 * No AI generation. No hallucination risk. Pure string templates.
 * Runs every Monday at 06:00 UTC via scheduler.
 */
function generateWeeklyReport() {
  const dataPath = path.join(__dirname, '../../public/radar-data/current.json');
  if (!fs.existsSync(dataPath)) {
    console.error('[report] No current data found. Run the aggregator first.');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const now = new Date();
  const weekNum = getISOWeek(now);
  const dateStr = now.toISOString().split('T')[0];

  // Identify top 3 movers by absolute trend value
  const allMovers = [
    ...(data.by_language || []).map(l => ({ name: l.language, type: 'language', trend: l.trend_30d, value: l.weighted_ai_percentage })),
    ...(data.by_tool || []).map(t => ({ name: t.tool, type: 'tool', trend: t.trend_30d, value: t.total_share })),
  ];
  allMovers.sort((a, b) => Math.abs(b.trend) - Math.abs(a.trend));
  const topMovers = allMovers.slice(0, 3);

  // Find highest governed industry
  const govLeader = [...(data.by_industry || [])].sort((a, b) => b.governance_percentage - a.governance_percentage)[0];

  const report = `# State of AI Code Weekly Report

**Week ${weekNum}, ${now.getUTCFullYear()}**
Generated: ${dateStr}

## Executive Summary

This week, AI assisted code comprised **${data.global?.weighted_ai_percentage || 0}%** of total output
(weighted by commit volume) across ${(data.data_coverage?.total_attestations || 0).toLocaleString()} open source repositories.

The median per-repository AI percentage is **${data.global?.median_ai_percentage || 0}%**.

## Global Statistics

| Metric | Value |
|--------|-------|
| Weighted AI % | ${data.global?.weighted_ai_percentage}% |
| Median AI % | ${data.global?.median_ai_percentage}% |
| Repos with AI | ${(data.global?.repos_with_any_ai || 0).toLocaleString()} |
| Repos without AI | ${(data.global?.repos_without_any_ai || 0).toLocaleString()} |
| Total commits covered | ${(data.data_coverage?.total_commits_covered || 0).toLocaleString()} |

## Top 3 Movers This Week

${topMovers.map((m, i) => `${i + 1}. **${m.name}** (${m.type}): ${m.trend > 0 ? '+' : ''}${m.trend}% trend. Current value: ${m.value}%.`).join('\n')}

## Tool Market Share

| Tool | Share | Trend |
|------|-------|-------|
${(data.by_tool || []).map(t => `| ${t.tool} | ${t.total_share}% | ${t.trend_30d > 0 ? '+' : ''}${t.trend_30d}% |`).join('\n')}

## Language Highlights

| Language | AI % | Sample |
|----------|------|--------|
${(data.by_language || []).slice(0, 6).map(l => `| ${l.language} | ${l.weighted_ai_percentage}% | n=${l.sample_size.toLocaleString()} |`).join('\n')}

## Governance Trends

${govLeader ? `The highest governance adoption rate is in **${govLeader.industry}** at ${govLeader.governance_percentage}%.` : 'Insufficient data for governance trends.'}

Governance distribution:
- Attested: ${data.global?.governance_distribution?.attested || 0}
- Scanned: ${data.global?.governance_distribution?.scanned || 0}
- Ungoverned: ${data.global?.governance_distribution?.ungoverned || 0}

## Data Quality

- Included in aggregates: ${(data.quality?.included_in_aggregates || 0).toLocaleString()}
- Excluded (opted out): ${(data.quality?.excluded_opted_out || 0).toLocaleString()}
- Excluded (outliers): ${data.quality?.excluded_outliers || 0}
- Confidence: ${data.quality?.coverage_confidence || 'unknown'}

## Methodology

All statistics sourced from public ai-attestation files. Full methodology:
https://oss.korext.com/radar/governance

This report is auto generated from live data. No AI was used to write the analysis text.

---

*Source: AI Code Radar, Korext Open Source. Data: CC BY 4.0.*
*Dashboard: https://oss.korext.com/radar*
`;

  // Write report
  const reportDir = path.join(__dirname, '../../public/radar-data/reports');
  fs.mkdirSync(reportDir, { recursive: true });

  const filename = `${now.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`;
  const outPath = path.join(reportDir, `${filename}.md`);
  fs.writeFileSync(outPath, report);

  console.log(`[report] Weekly report ${filename} written to ${outPath}`);
  console.log(`[report] Global AI %: ${data.global?.weighted_ai_percentage}%`);
  console.log(`[report] Top mover: ${topMovers[0]?.name} (${topMovers[0]?.trend > 0 ? '+' : ''}${topMovers[0]?.trend}%)`);
}

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

if (require.main === module) {
  generateWeeklyReport();
}

module.exports = { generateWeeklyReport };
