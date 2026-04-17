import Link from 'next/link';

async function fetchPattern(id) {
  try {
    const baseUrl = process.env.CLOUD_RUN_URL || 'https://korext-oss-uhozgvpbrq-uc.a.run.app';
    const res = await fetch(`${baseUrl}/api/regressions/${id}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Pattern not found
  }
  return null;
}

const sevColors = {
  critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  high: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  low: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  informational: { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' },
};

const catColors = {
  security: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  correctness: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  performance: 'bg-green-500/10 text-green-400 border-green-500/20',
  hallucination: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  compliance: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  maintainability: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
};

export default async function RegressionPatternDetail({ params }) {
  const { id: patternId } = await params;
  const pattern = await fetchPattern(patternId);

  if (!pattern || pattern.error) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-white mb-4">{patternId}</h1>
            <p className="text-white/50 mb-2">This pattern has not been published to the registry yet.</p>
            <p className="text-white/30 text-sm mb-8">
              Patterns appear here after submission and review. The database is community driven.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/regressions/browse" className="px-6 py-2.5 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] rounded-xl text-white/70 text-sm transition-colors">
                Browse Patterns
              </Link>
              <Link href="/regressions/submit" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-medium text-sm transition-colors">
                Submit a Pattern
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sev = sevColors[pattern.severity] || sevColors.informational;
  const cat = catColors[pattern.category] || catColors.correctness;
  const tools = pattern.ai_tools || [];
  const incorrectCode = pattern.incorrect_pattern?.code || pattern.incorrect_pattern || '';
  const correctCode = pattern.correct_pattern?.code || pattern.correct_pattern || '';

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="mb-6 flex space-x-2">
          <span className={`px-3 py-1 rounded ${sev.bg} ${sev.text} border ${sev.border} text-xs font-bold uppercase tracking-wider`}>
            {pattern.severity}
          </span>
          <span className={`px-3 py-1 rounded ${cat} border text-xs font-bold uppercase tracking-wider`}>
            {pattern.category}
          </span>
          {pattern.pattern_type && (
            <span className="px-3 py-1 rounded bg-white/[0.04] text-white/50 border border-white/[0.06] text-xs font-bold uppercase tracking-wider">
              {pattern.pattern_type}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">{patternId}: {pattern.title}</h1>
        <p className="text-white/40 text-sm mb-10">
          {pattern.language?.primary && `Language: ${pattern.language.primary}`}
          {pattern.status && ` • Status: ${pattern.status}`}
        </p>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="lg:col-span-2 space-y-8 sm:space-y-10">
            {pattern.summary && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/[0.06] pb-2">Summary</h2>
                <p className="text-white/60 leading-relaxed">{pattern.summary}</p>
              </section>
            )}

            {pattern.root_cause_hypothesis && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/[0.06] pb-2">Root Cause</h2>
                <p className="text-white/60 leading-relaxed">{pattern.root_cause_hypothesis}</p>
              </section>
            )}

            {incorrectCode && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/[0.06] pb-2">Incorrect Pattern</h2>
                <div className="bg-[#0d0e1a] border border-white/[0.1] rounded-lg p-4 sm:p-6">
                  <code className="text-red-400 block whitespace-pre-wrap font-mono text-sm">
                    {incorrectCode}
                  </code>
                </div>
              </section>
            )}

            {correctCode && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/[0.06] pb-2">Correct Pattern</h2>
                <div className="bg-[#0d0e1a] border border-white/[0.1] rounded-lg p-4 sm:p-6">
                  <code className="text-emerald-400 block whitespace-pre-wrap font-mono text-sm">
                    {correctCode}
                  </code>
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            {tools.length > 0 && (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-white font-bold mb-4">AI Tool Status</h3>
                <ul className="space-y-4">
                  {tools.map((tool, idx) => (
                    <li key={idx} className="flex justify-between items-center bg-white/[0.02] p-3 rounded border border-white/[0.04]">
                      <span className="text-white/80 text-sm">{tool.name}</span>
                      <span className={tool.status === 'fixed' ? 'text-emerald-400 text-xs' : 'text-red-400 text-xs'}>
                        {tool.status === 'fixed' ? `Fixed` : 'Still Present'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {pattern.detection && (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-white font-bold mb-4">Detection Links</h3>
                <ul className="space-y-2 text-sm text-white/50">
                  {pattern.detection.korext_packs?.length > 0 && (
                    <li>Korext Pack: <span className="text-purple-400">{pattern.detection.korext_packs.join(', ')}</span></li>
                  )}
                  {pattern.detection.korext_rule_ids?.length > 0 && (
                    <li>Rule ID: <span className="text-white/80">{pattern.detection.korext_rule_ids.join(', ')}</span></li>
                  )}
                  {pattern.detection.codeql_queries?.length > 0 && (
                    <li>CodeQL: <span className="text-white/80">{pattern.detection.codeql_queries.join(', ')}</span></li>
                  )}
                  {pattern.detection.semgrep_rules?.length > 0 && (
                    <li>Semgrep: <span className="text-white/80">{pattern.detection.semgrep_rules.join(', ')}</span></li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
