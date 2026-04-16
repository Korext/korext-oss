import Link from 'next/link';

export default function RegressionPatternDetail({ params }) {
  // This is a mockup of the pattern detail page.
  // In a real app, it would fetch from /api/regressions/[id]
  const patternId = params.id;
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-6 flex space-x-2">
            <span className="px-3 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold uppercase tracking-wider">High</span>
            <span className="px-3 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold uppercase tracking-wider">Security</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">{patternId}: Mock Title</h1>
        <p className="text-white/40 text-sm mb-10">Published: Mar 25, 2026 • Last reproduced: Apr 14, 2026</p>

        <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-10">
                <section>
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/[0.06] pb-2">Summary</h2>
                    <p className="text-white/60 leading-relaxed">This is a mock summary for {patternId}. This pattern represents a specific regression. The description goes here based on the YAML schema.</p>
                </section>
                
                <section>
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/[0.06] pb-2">Incorrect Pattern</h2>
                    <div className="bg-[#0d0e1a] border border-white/[0.1] rounded-lg p-6">
                        <code className="text-red-400 block whitespace-pre-wrap font-mono text-sm">
                            {`// Mock Incorrect Code
async function search(name) {
    const q = \`SELECT * FROM users WHERE name='\${name}'\`;
}`}
                        </code>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-white/[0.06] pb-2">Correct Pattern</h2>
                    <div className="bg-[#0d0e1a] border border-white/[0.1] rounded-lg p-6">
                        <code className="text-emerald-400 block whitespace-pre-wrap font-mono text-sm">
                            {`// Mock Correct Code
async function search(name) {
    const q = 'SELECT * FROM users WHERE name=?';
}`}
                        </code>
                    </div>
                </section>
            </div>

            <div className="md:col-span-1 space-y-8">
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                    <h3 className="text-white font-bold mb-4">AI Tool Status</h3>
                    <ul className="space-y-4">
                        <li className="flex justify-between items-center bg-white/[0.02] p-3 rounded border border-white/[0.04]">
                            <span className="text-white/80 text-sm">GitHub Copilot</span>
                            <span className="text-red-400 text-xs">Still Present</span>
                        </li>
                        <li className="flex justify-between items-center bg-white/[0.02] p-3 rounded border border-white/[0.04]">
                            <span className="text-white/80 text-sm">Cursor</span>
                            <span className="text-emerald-400 text-xs">Fixed in v0.45</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                    <h3 className="text-white font-bold mb-4">Detection Links</h3>
                    <ul className="space-y-2 text-sm text-white/50">
                        <li>Korext Pack: <span className="text-purple-400">web-security</span></li>
                        <li>Rule ID: <span className="text-white/80">sqli-string-concat-001</span></li>
                        <li>CodeQL: <span className="text-white/80">js/sql-injection</span></li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
