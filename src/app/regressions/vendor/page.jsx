'use client';

import Link from 'next/link';
import { useState } from 'react';

const TRACKED_TOOLS = [
  { name: 'GitHub Copilot', identifier: 'copilot', patternsTotal: 12, patternsOpen: 8, patternsFixed: 4, avgReproRate: 0.52, lastTested: '2026-04-14' },
  { name: 'Cursor', identifier: 'cursor', patternsTotal: 9, patternsOpen: 5, patternsFixed: 4, avgReproRate: 0.44, lastTested: '2026-04-14' },
  { name: 'Claude Code', identifier: 'claude-code', patternsTotal: 7, patternsOpen: 4, patternsFixed: 3, avgReproRate: 0.38, lastTested: '2026-04-14' },
  { name: 'Codeium', identifier: 'codeium', patternsTotal: 5, patternsOpen: 3, patternsFixed: 2, avgReproRate: 0.41, lastTested: '2026-04-07' },
  { name: 'Aider', identifier: 'aider', patternsTotal: 4, patternsOpen: 2, patternsFixed: 2, avgReproRate: 0.35, lastTested: '2026-04-07' },
  { name: 'OpenAI Codex CLI', identifier: 'codex-cli', patternsTotal: 3, patternsOpen: 2, patternsFixed: 1, avgReproRate: 0.40, lastTested: '2026-04-07' },
  { name: 'Gemini Code Assist', identifier: 'gemini-code-assist', patternsTotal: 3, patternsOpen: 2, patternsFixed: 1, avgReproRate: 0.39, lastTested: '2026-04-07' },
  { name: 'Windsurf', identifier: 'windsurf', patternsTotal: 4, patternsOpen: 3, patternsFixed: 1, avgReproRate: 0.47, lastTested: '2026-04-07' },
  { name: 'Tabnine', identifier: 'tabnine', patternsTotal: 2, patternsOpen: 1, patternsFixed: 1, avgReproRate: 0.32, lastTested: '2026-03-31' },
  { name: 'Devin', identifier: 'devin', patternsTotal: 2, patternsOpen: 1, patternsFixed: 1, avgReproRate: 0.36, lastTested: '2026-04-07' },
  { name: 'OpenHands', identifier: 'openhands', patternsTotal: 2, patternsOpen: 2, patternsFixed: 0, avgReproRate: 0.42, lastTested: '2026-04-07' },
  { name: 'Amazon Q Developer', identifier: 'amazon-q', patternsTotal: 2, patternsOpen: 1, patternsFixed: 1, avgReproRate: 0.33, lastTested: '2026-04-07' },
  { name: 'JetBrains AI Assistant', identifier: 'jetbrains-ai', patternsTotal: 2, patternsOpen: 1, patternsFixed: 1, avgReproRate: 0.31, lastTested: '2026-03-31' },
  { name: 'Sourcegraph Cody', identifier: 'sourcegraph-cody', patternsTotal: 1, patternsOpen: 1, patternsFixed: 0, avgReproRate: 0.34, lastTested: '2026-03-31' },
  { name: 'Replit AI', identifier: 'replit-ai', patternsTotal: 1, patternsOpen: 1, patternsFixed: 0, avgReproRate: 0.38, lastTested: '2026-03-31' },
  { name: 'Cline', identifier: 'cline', patternsTotal: 2, patternsOpen: 1, patternsFixed: 1, avgReproRate: 0.37, lastTested: '2026-04-07' },
  { name: 'Continue', identifier: 'continue', patternsTotal: 1, patternsOpen: 1, patternsFixed: 0, avgReproRate: 0.30, lastTested: '2026-03-31' },
  { name: 'GPT Engineer', identifier: 'gpt-engineer', patternsTotal: 1, patternsOpen: 1, patternsFixed: 0, avgReproRate: 0.43, lastTested: '2026-03-31' },
  { name: 'Bolt', identifier: 'bolt', patternsTotal: 1, patternsOpen: 1, patternsFixed: 0, avgReproRate: 0.45, lastTested: '2026-03-31' },
];

const NOTIFICATION_STEPS = [
  { step: '1', title: 'Pattern Submitted', description: 'A community member or maintainer submits a new regression pattern with reproduction steps.' },
  { step: '2', title: 'Initial Review', description: 'Database maintainers verify the pattern is reproducible (>= 3/10 attempts) and meets documentation standards.' },
  { step: '3', title: 'Vendor Notification', description: 'Your team is notified 7 days before publication. You receive the full pattern, reproduction steps, and severity assessment.' },
  { step: '4', title: 'Response Window', description: 'You have 7 days to file a response that will be published alongside the pattern. Responses are never edited.' },
  { step: '5', title: 'Publication', description: 'The pattern goes live with your response attached. You can update status anytime as fixes ship.' },
];

const FAQ_ITEMS = [
  {
    q: 'Who can register as a vendor?',
    a: 'Any organization that develops or maintains an AI coding tool tracked in the database. Registration requires a verified corporate email domain. We verify identity before granting access.'
  },
  {
    q: 'What can vendors do on the portal?',
    a: 'View all patterns filed against your tool before publication. Submit official responses during the 7-day notification window. Mark patterns as "fix planned" or "fix shipped" with the version number. Your response appears permanently alongside the pattern.'
  },
  {
    q: 'Are vendor responses edited?',
    a: 'Never. Vendor responses are published exactly as submitted, attributed to your organization. The only moderation is removal of content that violates the Code of Conduct (hate speech, threats, etc.).'
  },
  {
    q: 'What if we fix a pattern?',
    a: 'Update the pattern status to "fix shipped" and include the version number. The automated test harness will verify the fix in the next weekly test cycle. Once confirmed, the pattern is marked as "fixed" with public recognition of your improvement.'
  },
  {
    q: 'What is the 7-day notification period?',
    a: 'Shorter than the AI Incident Registry (14 days) because regression patterns are less sensitive than security incidents. Patterns document publicly observable behavior, not security vulnerabilities. Vendors receive the full pattern including reproduction steps.'
  },
  {
    q: 'Can we dispute a pattern?',
    a: 'Yes. If you believe a pattern is unreproducible, submit a dispute with your testing methodology. Maintainers will re-test. If the reproduction rate drops below 3/10, the pattern is withdrawn. Disputes are documented in the change log.'
  },
  {
    q: 'Is this a ranking of AI tools?',
    a: 'No. The database documents patterns, not rankings. Every AI tool has failure modes. We track improvement over time. When your tool fixes a pattern, that improvement is publicly recognized. The database is neutral infrastructure.'
  },
];

export default function VendorPortalPage() {
  const [showForm, setShowForm] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', org: '', tool: '', role: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/regressions/vendor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(data);
        setShowForm(false);
      } else {
        setError(data.error || 'Submission failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <Link href="/regressions" className="text-purple-400 text-sm hover:underline mb-8 inline-block">
          Back to Regression Database
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
            For AI Tool Vendors
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Vendor Portal</h1>
          <p className="text-white/50 text-lg max-w-3xl">
            Respond to patterns, track fix status across versions, and publicly demonstrate improvement. Vendors are participants in this database, not just subjects.
          </p>
        </div>

        {/* How Notification Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">How Vendor Notification Works</h2>
          <div className="space-y-4">
            {NOTIFICATION_STEPS.map((s) => (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 text-sm font-bold">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-white/40 text-sm">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Vendors Can Do */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">What Vendors Can Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <h3 className="font-semibold text-white">Respond to Patterns</h3>
              <p className="text-white/40 text-sm">Submit official statements during the 7-day notification window. Responses are published verbatim alongside the pattern.</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-semibold text-white">Mark Fixes</h3>
              <p className="text-white/40 text-sm">Update pattern status to "fix planned" or "fix shipped" with the version. The test harness verifies fixes weekly.</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="font-semibold text-white">Track History</h3>
              <p className="text-white/40 text-sm">View complete testing history: reproduction rates over time, which patterns were fixed, and how your fix rate compares.</p>
            </div>
          </div>
        </section>

        {/* Tool Overview Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Tools Currently Tracked</h2>
          <p className="text-white/30 text-sm mb-6">{TRACKED_TOOLS.length} AI coding tools monitored across the database</p>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] text-left">
                    <th className="px-4 py-3 text-white/40 font-medium">Tool</th>
                    <th className="px-4 py-3 text-white/40 font-medium text-right">Patterns</th>
                    <th className="px-4 py-3 text-white/40 font-medium text-right">Open</th>
                    <th className="px-4 py-3 text-white/40 font-medium text-right">Fixed</th>
                    <th className="px-4 py-3 text-white/40 font-medium text-right">Avg Repro Rate</th>
                    <th className="px-4 py-3 text-white/40 font-medium text-right">Last Tested</th>
                  </tr>
                </thead>
                <tbody>
                  {TRACKED_TOOLS.map((tool) => (
                    <tr key={tool.identifier} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-white/80 font-medium">{tool.name}</td>
                      <td className="px-4 py-3 text-white/60 text-right font-mono">{tool.patternsTotal}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-amber-400 font-mono">{tool.patternsOpen}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-emerald-400 font-mono">{tool.patternsFixed}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-white/50">{(tool.avgReproRate * 10).toFixed(0)}/10</td>
                      <td className="px-4 py-3 text-right text-white/30 text-xs">{tool.lastTested}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-white/[0.06] text-xs text-white/25">
              Reproduction rates are averages across all open patterns. Test dates reflect automated harness runs (API tools) or community reports (IDE tools).
            </div>
          </div>
        </section>

        {/* Registration */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Register as a Vendor</h2>
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6 sm:p-8">
            {submitted ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Registration Submitted</h3>
                <p className="text-white/50 text-sm">{submitted.message}</p>
                <p className="text-white/25 text-xs">Reference: {submitted.registration_id}</p>
              </div>
            ) : !showForm ? (
              <div className="text-center space-y-4">
                <p className="text-white/60">Registration requires a verified corporate email domain. We verify your identity before granting access to respond to patterns and update fix status.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-medium transition-colors border border-purple-500/20 text-sm"
                >
                  Register Your Tool
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-w-lg mx-auto">
                {error && (
                  <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm text-white/50 mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/40"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/40"
                    placeholder="jane@yourcompany.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1">Organization *</label>
                  <input
                    type="text"
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/40"
                    placeholder="AI Tool Company"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1">AI Tool *</label>
                  <select
                    value={formData.tool}
                    onChange={(e) => setFormData({ ...formData, tool: e.target.value })}
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/40"
                  >
                    <option value="" className="bg-[#0d0e1a]">Select your tool</option>
                    {TRACKED_TOOLS.map(t => (
                      <option key={t.identifier} value={t.identifier} className="bg-[#0d0e1a]">{t.name}</option>
                    ))}
                    <option value="other" className="bg-[#0d0e1a]">Other (not listed)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1">Your Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/40"
                    placeholder="Engineering Lead, DevRel, etc."
                  />
                </div>
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => { setShowForm(false); setError(null); }}
                    className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg text-white/60 text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !formData.name || !formData.email || !formData.org || !formData.tool}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-colors border border-purple-500/20"
                  >
                    {submitting ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </div>
                <p className="text-xs text-white/25 pt-2">We will verify your corporate domain and contact you within 2 business days. Registration does not require a GitHub account.</p>
              </div>
            )}
          </div>
        </section>

        {/* Ethical Commitments */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Our Commitments to Vendors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
              <h3 className="font-semibold text-white text-sm">Neutral Infrastructure</h3>
              <p className="text-white/40 text-sm">The database documents patterns, not rankings. We never frame results as "which AI is worst." Every tool has failure modes.</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
              <h3 className="font-semibold text-white text-sm">Public Recognition of Fixes</h3>
              <p className="text-white/40 text-sm">When your tool fixes a pattern, we publicly recognize the improvement. Fixed patterns remain as a record of your responsiveness.</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
              <h3 className="font-semibold text-white text-sm">Version Awareness</h3>
              <p className="text-white/40 text-sm">We test against your latest versions. Old patterns are not used to characterize current performance. The database tracks improvement.</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
              <h3 className="font-semibold text-white text-sm">Unedited Responses</h3>
              <p className="text-white/40 text-sm">Your official responses are published exactly as submitted. We never edit, summarize, or misrepresent vendor statements.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium text-white/80 text-sm pr-4">{faq.q}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 text-white/30 shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-4 text-sm text-white/40 border-t border-white/[0.04] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="text-center">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 space-y-4">
            <h2 className="text-xl font-bold text-white">Questions?</h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              If you represent an AI tool vendor and have questions about the notification process, vendor portal, or any pattern filed against your tool, contact us directly.
            </p>
            <a href="mailto:maintainers@korext.com" className="inline-block px-6 py-3 bg-white/[0.06] hover:bg-white/[0.1] rounded-xl text-white font-medium transition-colors border border-white/[0.08] text-sm">
              maintainers@korext.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
