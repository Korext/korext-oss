'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';

const navItems = [
  { href: '/ai-attestation', label: 'AI Attestation' },
  { href: '/ai-license', label: 'AI License' },
  { href: '/supply-chain', label: 'Supply Chain' },
  { href: '/incidents', label: 'Incidents' },
  { href: '/regressions', label: 'Regressions' },
  { href: '/radar', label: 'AI Code Radar' },
  { href: '/commit-carbon', label: 'Commit Carbon' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Focus trap for mobile menu
  const handleKeyDown = useCallback((e) => {
    if (!mobileOpen || !menuRef.current) return;

    if (e.key === 'Escape') {
      setMobileOpen(false);
      toggleRef.current?.focus();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = menuRef.current.querySelectorAll('a, button');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first menu item
      const timer = setTimeout(() => {
        menuRef.current?.querySelector('a')?.focus();
      }, 50);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [mobileOpen, handleKeyDown]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0d0e1a]/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" id="nav-home">
          <Image
            src="/logo.png"
            alt="Korext"
            width={28}
            height={28}
            className="rounded-sm"
            priority
          />
          <span className="font-semibold text-[15px] text-white/90 group-hover:text-white transition-colors tracking-tight">
            Korext <span className="text-white/50 font-normal">Open Source</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`nav-${item.href.slice(1)}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-white/[0.06]'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="w-px h-5 bg-white/[0.08] mx-2" aria-hidden="true" />
          <a
            href="https://github.com/korext"
            target="_blank"
            rel="noopener noreferrer"
            id="nav-github"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="https://korext.com"
            target="_blank"
            rel="noopener noreferrer"
            id="nav-korext"
            className="ml-1 px-4 py-2 rounded-lg text-sm font-medium bg-violet-600/80 text-white hover:bg-violet-500 transition-all duration-200 border border-violet-500/30"
          >
            Korext →
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] transition-all"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          id="nav-mobile-toggle"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>
    </header>

    {/* Mobile overlay menu - outside header to avoid stacking context issues */}
    {mobileOpen && (
      <div
        ref={menuRef}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-[9999] bg-[#0d0e1a] overflow-y-auto"
      >
        <nav className="container mx-auto px-4 py-6 space-y-2" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`nav-mobile-${item.href.slice(1)}`}
                className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'text-white bg-white/[0.08] border border-white/[0.1]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="border-t border-white/[0.08] my-4" aria-hidden="true" />
          <a
            href="https://github.com/korext"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-white/60 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="https://korext.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-4 py-3.5 rounded-xl text-base font-semibold bg-violet-600/80 text-white border border-violet-500/30 hover:bg-violet-500 transition-all"
          >
            Korext →
          </a>
        </nav>
      </div>
    )}
    </>
  );
}
