'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ConsentPreferences = dynamic(() => import('./ConsentPreferences'), { ssr: false });

const projects = [
  { href: '/ai-attestation', label: 'AI Attestation' },
  { href: '/ai-license', label: 'AI License' },
  { href: '/supply-chain', label: 'Supply Chain' },
  { href: '/incidents', label: 'Incidents' },
  { href: '/regressions', label: 'Regression DB' },
  { href: '/radar', label: 'AI Code Radar' },
  { href: '/commit-carbon', label: 'Commit Carbon' },
];

const resources = [
  { href: 'https://github.com/korext/ai-attestation', label: 'GitHub: AI Attestation', external: true },
  { href: 'https://github.com/korext/ai-license', label: 'GitHub: AI License', external: true },
  { href: 'https://github.com/korext/supply-chain-attestation', label: 'GitHub: Supply Chain', external: true },
  { href: 'https://github.com/korext/ai-incident-registry', label: 'GitHub: AI Incidents', external: true },
  { href: 'https://www.npmjs.com/package/@korext/ai-attestation', label: 'npm: ai-attestation', external: true },
  { href: 'https://www.npmjs.com/package/@korext/ai-license', label: 'npm: ai-license', external: true },
  { href: 'https://www.npmjs.com/package/@korext/supply-check', label: 'npm: supply-check', external: true },
  { href: 'https://www.npmjs.com/package/@korext/incident-report', label: 'npm: incident-report', external: true },
  { href: 'https://github.com/korext/ai-regression-database', label: 'GitHub: AI Regressions', external: true },
  { href: 'https://www.npmjs.com/package/@korext/regression-submit', label: 'npm: regression-submit', external: true },
  { href: 'https://github.com/korext/commit-carbon', label: 'GitHub: Commit Carbon', external: true },
  { href: 'https://www.npmjs.com/package/@korext/commit-carbon', label: 'npm: commit-carbon', external: true },
];

const community = [
  { href: '/team', label: 'Team', internal: true },
  { href: 'https://github.com/korext', label: 'GitHub', external: true },
  { href: 'https://github.com/korext/ai-attestation/blob/main/CONTRIBUTING.md', label: 'Contributing', external: true },
];

const company = [
  { href: 'https://korext.com', label: 'Korext', external: true },
  { href: 'https://korext.com/legal', label: 'Terms', external: true },
];

export default function Footer() {
  const [showPreferences, setShowPreferences] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="relative z-10 border-t border-white/[0.06] mt-32" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 py-16">
          {/* Brand row */}
          <div className="mb-12 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="Korext" width={24} height={24} className="rounded-sm" />
              <span className="font-semibold text-sm text-white tracking-tight">
                Korext <span className="text-white/60 font-normal">Open Source</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Open standards and tools for AI code transparency. Free forever.
            </p>
            <a
              href="mailto:maintainers@korext.com"
              className="inline-flex items-center gap-2 text-xs font-medium text-violet-400/80 hover:text-violet-300 transition-colors group"
            >
              <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Become a maintainer
            </a>
          </div>

          {/* 4-column nav grid: Projects, Resources, Community, Company */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
            {/* Projects */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/90">Projects</h3>
              <ul className="space-y-3">
                {projects.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/90">Resources</h3>
              <ul className="space-y-3">
                {resources.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/90">Community</h3>
              <ul className="space-y-3">
                {community.map((c) => (
                  <li key={c.href}>
                    {c.internal ? (
                      <Link href={c.href} className="text-sm text-white/60 hover:text-white transition-colors">
                        {c.label}
                      </Link>
                    ) : (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                        {c.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/90">Company</h3>
              <ul className="space-y-3">
                {company.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Privacy row */}
          <div className="pb-8 border-b border-white/[0.06] flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors py-2">
              Privacy Policy
            </Link>
            <span className="text-white/15">·</span>
            <Link href="/cookies" className="text-xs text-white/40 hover:text-white/60 transition-colors py-2">
              Cookie Policy
            </Link>
            <span className="text-white/15">·</span>
            <button
              onClick={() => setShowPreferences(true)}
              className="text-xs text-white/40 hover:text-white/60 transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:rounded"
            >
              Privacy Preferences
            </button>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50">
              © {year} Korext. All rights reserved.
            </p>
            <p className="text-xs text-white/50">
              Specifications are published under CC0 1.0. Code under Apache 2.0. Data under CC BY 4.0.
            </p>
          </div>
        </div>
      </footer>

      {showPreferences && (
        <ConsentPreferences
          onClose={() => setShowPreferences(false)}
          onSave={() => setShowPreferences(false)}
        />
      )}
    </>
  );
}
