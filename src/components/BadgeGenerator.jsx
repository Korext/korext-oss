"use client";

import { useState } from 'react';

export default function BadgeGenerator() {
  const [repo, setRepo] = useState('');
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const formatRepo = (input) => {
    return input.replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '').trim();
  };

  const parsedRepo = formatRepo(repo);
  const isValid = parsedRepo.split('/').length === 2;

  const badgeUrl = isValid ? `https://oss.korext.com/badge/${parsedRepo}` : '';
  const reportUrl = isValid ? `https://oss.korext.com/report/${parsedRepo}` : '';

  const markdown = `[![AI Attestation](${badgeUrl})](${reportUrl})`;
  const html = `<a href="${reportUrl}"><img src="${badgeUrl}" alt="AI Attestation" /></a>`;

  const handleCopyMd = () => {
    navigator.clipboard.writeText(markdown);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Get Your Badge</h3>
        <p className="text-sm text-white/40">Generate a dynamic SVG badge for your repository.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            id="badge-repo-input"
            placeholder="owner/repo (e.g. acme/payments)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-[#0d0e1a] border border-white/[0.08] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/30 transition-all"
          />
        </div>
      </div>

      {isValid && (
        <div className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">Preview</h4>
            <div className="p-4 bg-[#0d0e1a] border border-white/[0.06] rounded-xl flex items-center justify-center min-h-[60px]">
              <img src={badgeUrl} alt="AI Attestation Preview" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">Markdown</h4>
              <button onClick={handleCopyMd} className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium py-2 px-3 -mr-3 rounded-lg">
                {copiedMd ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 bg-[#0d0e1a] border border-white/[0.06] rounded-xl overflow-x-auto text-sm text-white/60 font-mono">
              <code>{markdown}</code>
            </pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">HTML</h4>
              <button onClick={handleCopyHtml} className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium py-2 px-3 -mr-3 rounded-lg">
                {copiedHtml ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 bg-[#0d0e1a] border border-white/[0.06] rounded-xl overflow-x-auto text-sm text-white/60 font-mono">
              <code>{html}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
