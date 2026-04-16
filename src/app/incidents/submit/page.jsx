'use client';

import { useState } from 'react';
import Link from 'next/link';

const patternTypes = ['injection', 'authentication', 'authorization', 'cryptography', 'data-exposure', 'resource', 'logic', 'hallucination', 'performance', 'compliance', 'dependency'];

function hasPII(text) {
  if (!text) return false;
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const ccRegex = /\b(?:\d[ -]*?){13,16}\b/g;
  const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
  return emailRegex.test(text) || ccRegex.test(text) || ssnRegex.test(text);
}

export default function SubmitIncident() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '', severity: 'medium', discoveredDate: new Date().toISOString().split('T')[0],
    aiTool: '', aiToolVersion: '', language: '', framework: '', patternType: 'logic',
    incorrectPattern: '', correctPattern: '', summary: '',
    exploitations: '', impactUsd: '', affectedOrgs: '', publicDisclosure: 'no',
    shortTermFix: '', longTermFix: '', korextPacks: '', korextRuleIds: '',
    reporterName: '', reporterOrg: '', reporterContact: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const piiFields = ['summary', 'incorrectPattern', 'correctPattern', 'shortTermFix', 'longTermFix'];
  const piiDetected = piiFields.some(f => hasPII(formData[f]));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    if (piiDetected) {
      setError('Potential PII detected. Please scrub sensitive data before submission.');
      setSubmitting(false);
      return;
    }
    try {
      const payload = {
        title: formData.title, summary: formData.summary, severity: formData.severity,
        discovered_date: formData.discoveredDate,
        ai_tool: { name: formData.aiTool, version: formData.aiToolVersion },
        affected_pattern: { language: formData.language, framework: formData.framework, pattern_type: formData.patternType, libraries: [], cwe_references: [] },
        incorrect_pattern: formData.incorrectPattern, correct_pattern: formData.correctPattern,
        impact: { confirmed_exploitations: formData.exploitations ? parseInt(formData.exploitations) : null, estimated_impact_usd: formData.impactUsd ? parseInt(formData.impactUsd) : null, affected_organizations: formData.affectedOrgs ? parseInt(formData.affectedOrgs) : null, public_disclosure: formData.publicDisclosure },
        detection: { korext_packs: formData.korextPacks ? formData.korextPacks.split(',').map(s=>s.trim()) : [], korext_rule_ids: formData.korextRuleIds ? formData.korextRuleIds.split(',').map(s=>s.trim()) : [], semgrep_rules: [], snyk_rules: [], codeql_queries: [] },
        remediation: { short_term: formData.shortTermFix, long_term: formData.longTermFix },
        reporter: { name: formData.reporterName || null, organization: formData.reporterOrg || null, contact: formData.reporterContact || null },
      };
      const res = await fetch('/api/incidents/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setResult(data);
    } catch(err) { setError(err.message); } finally { setSubmitting(false); }
  };

  if (result) {
    return (
      <div className="min-h-screen py-32 text-center container mx-auto px-6">
        <div className="max-w-md mx-auto p-8 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-white mb-4">Submission Received</h2>
          <p className="text-white/60 mb-6">Your report has been queued for maintainer review. Expected review: 5 to 10 business days.</p>
          <div className="p-4 bg-[#0d0e1a] rounded-xl font-mono text-sm text-emerald-400 mb-6">ID: {result.submission_id}</div>
          <Link href="/incidents" className="text-violet-400 hover:text-violet-300">Return to Registry</Link>
        </div>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 bg-[#0d0e1a] border border-white/[0.08] rounded-xl text-white outline-none focus:border-violet-500/50";
  const labelCls = "block text-sm font-medium text-white/60 mb-2";
  const stepIndicator = (n, label) => (
    <div className={`flex items-center gap-2 text-xs font-medium ${step === n ? 'text-violet-400' : step > n ? 'text-emerald-400' : 'text-white/20'}`}>
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${step === n ? 'border-violet-500 bg-violet-500/20' : step > n ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-white/10'}`}>{step > n ? '✓' : n}</span>
      {label}
    </div>
  );

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-4">Report an AI Incident</h1>
        <p className="text-white/50 mb-8">Anonymous submission is the default. Reporter information is opt in.</p>

        {/* Step Indicators */}
        <div className="flex flex-wrap gap-4 mb-12 pb-8 border-b border-white/[0.06]">
          {stepIndicator(1, 'Basics')}
          {stepIndicator(2, 'AI Tool')}
          {stepIndicator(3, 'Technical')}
          {stepIndicator(4, 'Impact')}
          {stepIndicator(5, 'Detection')}
          {stepIndicator(6, 'Reporter')}
          {stepIndicator(7, 'Review')}
        </div>

        {error && <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">{error}</div>}
        {piiDetected && <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-xl">Warning: PII detected in free text fields. Please remove before submitting.</div>}

        <div className="space-y-6 p-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
          {step === 1 && <>
            <div><label className={labelCls}>Title (short description)</label><input required value={formData.title} onChange={e=>update('title',e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Severity</label>
              <select value={formData.severity} onChange={e=>update('severity',e.target.value)} className={inputCls}>
                <option value="informational">Informational</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
              </select>
            </div>
            <div><label className={labelCls}>Discovered Date</label><input type="date" value={formData.discoveredDate} onChange={e=>update('discoveredDate',e.target.value)} className={inputCls} /></div>
          </>}
          {step === 2 && <>
            <div><label className={labelCls}>AI Tool Name</label><input placeholder="e.g. GitHub Copilot" value={formData.aiTool} onChange={e=>update('aiTool',e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>AI Tool Version (optional)</label><input placeholder="e.g. 1.145" value={formData.aiToolVersion} onChange={e=>update('aiToolVersion',e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Pattern Type</label>
              <select value={formData.patternType} onChange={e=>update('patternType',e.target.value)} className={inputCls}>
                {patternTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </>}
          {step === 3 && <>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>Language</label><input placeholder="e.g. JavaScript" value={formData.language} onChange={e=>update('language',e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Framework (optional)</label><input placeholder="e.g. Node.js" value={formData.framework} onChange={e=>update('framework',e.target.value)} className={inputCls} /></div>
            </div>
            <div><label className={labelCls}>Incorrect Code Pattern (redact all PII)</label><textarea rows={6} value={formData.incorrectPattern} onChange={e=>update('incorrectPattern',e.target.value)} className={`${inputCls} font-mono text-sm`} /></div>
            <div><label className={labelCls}>Correct Code Pattern</label><textarea rows={6} value={formData.correctPattern} onChange={e=>update('correctPattern',e.target.value)} className={`${inputCls} font-mono text-sm`} /></div>
          </>}
          {step === 4 && <>
            <div><label className={labelCls}>Impact Summary</label><textarea rows={4} value={formData.summary} onChange={e=>update('summary',e.target.value)} className={inputCls} /></div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className={labelCls}>Exploitations</label><input type="number" value={formData.exploitations} onChange={e=>update('exploitations',e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Impact (USD)</label><input type="number" value={formData.impactUsd} onChange={e=>update('impactUsd',e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Affected Orgs</label><input type="number" value={formData.affectedOrgs} onChange={e=>update('affectedOrgs',e.target.value)} className={inputCls} /></div>
            </div>
            <div><label className={labelCls}>Public Disclosure</label>
              <select value={formData.publicDisclosure} onChange={e=>update('publicDisclosure',e.target.value)} className={inputCls}>
                <option value="yes">Yes</option><option value="no">No</option><option value="partial">Partial</option>
              </select>
            </div>
          </>}
          {step === 5 && <>
            <div><label className={labelCls}>Short Term Remediation</label><textarea rows={3} value={formData.shortTermFix} onChange={e=>update('shortTermFix',e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Long Term Remediation</label><textarea rows={3} value={formData.longTermFix} onChange={e=>update('longTermFix',e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Korext Governance Packs (comma separated)</label><input value={formData.korextPacks} onChange={e=>update('korextPacks',e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Korext Rule IDs (comma separated)</label><input value={formData.korextRuleIds} onChange={e=>update('korextRuleIds',e.target.value)} className={inputCls} /></div>
          </>}
          {step === 6 && <>
            <p className="text-sm text-white/50 mb-4">Reporter information is optional. Anonymous submission is the default.</p>
            <div><label className={labelCls}>Name (optional)</label><input value={formData.reporterName} onChange={e=>update('reporterName',e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Organization (optional)</label><input value={formData.reporterOrg} onChange={e=>update('reporterOrg',e.target.value)} className={inputCls} /></div>
            <div><label className={labelCls}>Contact Email (optional)</label><input type="email" value={formData.reporterContact} onChange={e=>update('reporterContact',e.target.value)} className={inputCls} /></div>
          </>}
          {step === 7 && <>
            <h3 className="text-lg font-semibold text-white mb-4">Review Your Submission</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/[0.04] pb-2"><span className="text-white/40">Title</span><span className="text-white">{formData.title}</span></div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2"><span className="text-white/40">Severity</span><span className="text-white">{formData.severity}</span></div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2"><span className="text-white/40">AI Tool</span><span className="text-white">{formData.aiTool}</span></div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2"><span className="text-white/40">Language</span><span className="text-white">{formData.language}</span></div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2"><span className="text-white/40">Pattern Type</span><span className="text-white">{formData.patternType}</span></div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2"><span className="text-white/40">Reporter</span><span className="text-white">{formData.reporterName || 'Anonymous'}</span></div>
            </div>
            {formData.incorrectPattern && <pre className="mt-4 p-4 bg-[#0a0a0f] border border-white/[0.06] rounded-xl text-xs text-red-400/80 font-mono overflow-x-auto">{formData.incorrectPattern}</pre>}
          </>}
        </div>

        <div className="flex justify-between mt-8">
          {step > 1 ? <button onClick={() => setStep(step-1)} className="px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] transition-all">Back</button> : <div />}
          {step < 7 ? (
            <button onClick={() => setStep(step+1)} className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all">Next</button>
          ) : (
            <button disabled={submitting || piiDetected} onClick={handleSubmit} className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all disabled:opacity-50">
              {submitting ? 'Submitting...' : 'Submit for Review'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
