'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function IncidentDetail() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/incidents/${id}`)
      .then(r => r.json())
      .then(data => {
        setIncident(data.error ? null : data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 text-center text-white/40">Loading incident...</div>;
  
  if (!incident) return (
    <div className="min-h-screen pt-32 text-center">
      <h1 className="text-4xl text-white mb-4">Not Found</h1>
      <Link href="/incidents/browse" className="text-violet-400">Return to registry</Link>
    </div>
  );

  const isExample = incident.identifier.startsWith('EXAMPLE');

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/incidents/browse" className="text-sm text-white/40 hover:text-white mb-8 inline-block">← Back to Registry</Link>
        
        {isExample && (
          <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-sm">
            <strong>Example Record:</strong> This is an example for documentation purposes and does not represent a real incident.
          </div>
        )}

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <span className="font-mono text-white/50">{incident.identifier}</span>
             <span className={`text-xs px-2 py-0.5 rounded-md border ${
                incident.severity === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                incident.severity === 'high' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                incident.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
             }`}>
               {incident.severity}
             </span>
             <span className="text-sm text-emerald-400 border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 rounded-md">✓ Verified</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{incident.title}</h1>
          <div className="flex gap-6 border-y border-white/[0.06] py-4 text-sm text-white/40">
            <div>Published: <span className="text-white">{new Date(incident.published_date).toLocaleDateString()}</span></div>
            <div>Tool: <span className="text-white">{incident.ai_tool.name}</span></div>
            <div>Language: <span className="text-white">{incident.affected_pattern.language}</span></div>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
            <p className="text-white/60 leading-relaxed">{incident.summary}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Incorrect Pattern</h2>
            <pre className="p-6 bg-[#0a0a0f] border border-white/[0.06] rounded-xl overflow-x-auto text-sm text-red-400/80 font-mono">
              <code>{incident.incorrect_pattern}</code>
            </pre>
          </section>

          {incident.correct_pattern && (
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Correct Pattern</h2>
              <pre className="p-6 bg-[#0a0a0f] border border-white/[0.06] rounded-xl overflow-x-auto text-sm text-emerald-400/80 font-mono">
                <code>{incident.correct_pattern}</code>
              </pre>
            </section>
          )}

          <section className="p-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
            <h2 className="text-xl font-semibold text-white mb-6">Detection Rule Mapping</h2>
            <p className="text-sm text-white/50 mb-6">These patterns can be automatically detected in CI to prevent this incident from recurring.</p>
            
            <div className="space-y-4">
              {incident.detection?.korext_rule_ids?.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">Korext Rules</div>
                  <div className="flex flex-wrap gap-2">
                    {incident.detection.korext_rule_ids.map(r => (
                      <span key={r} className="px-3 py-1.5 rounded-lg bg-[#0d0e1a] border border-white/[0.08] text-violet-400 font-mono text-xs">{r}</span>
                    ))}
                  </div>
                </div>
              )}
              {incident.detection?.semgrep_rules?.length > 0 && (
                <div className="pt-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-2">Semgrep Rules</div>
                  <div className="flex flex-wrap gap-2">
                    {incident.detection.semgrep_rules.map(r => (
                      <span key={r} className="px-3 py-1.5 rounded-lg bg-[#0d0e1a] border border-white/[0.08] text-white/60 font-mono text-xs">{r}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/[0.06]">
             <div>
               <h3 className="text-sm font-semibold text-white mb-3">Impact Metrics</h3>
               <ul className="space-y-2 text-sm text-white/50">
                 <li>Confirmed exploitations: <span className="text-white">{incident.impact?.confirmed_exploitations ?? 'Unknown'}</span></li>
                 <li>Affected organizations: <span className="text-white">{incident.impact?.affected_organizations ?? 'Unknown'}</span></li>
                 <li>Public disclosure: <span className="text-white">{incident.impact?.public_disclosure}</span></li>
               </ul>
             </div>
             <div>
               <h3 className="text-sm font-semibold text-white mb-3">Remediation Guidance</h3>
               <div className="space-y-4 text-sm text-white/60">
                 <p><strong>Short term:</strong> {incident.remediation?.short_term}</p>
                 <p><strong>Long term:</strong> {incident.remediation?.long_term}</p>
               </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
