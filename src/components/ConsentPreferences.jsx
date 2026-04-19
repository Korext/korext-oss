'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { getConsentData, setConsent } from '@/lib/consent';

function Toggle({ enabled, locked, onChange, id }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={enabled}
      disabled={locked}
      onClick={() => !locked && onChange(!enabled)}
      className={`
        relative w-11 h-6 rounded-full transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1b2e]
        ${locked ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${enabled
          ? locked
            ? 'bg-violet-600/40'
            : 'bg-violet-600'
          : 'bg-white/[0.08] border border-white/[0.08]'
        }
      `}
    >
      <span
        className={`
          absolute top-0.5 left-0.5
          w-5 h-5 rounded-full transition-transform duration-200
          flex items-center justify-center
          ${enabled
            ? 'translate-x-5 bg-white'
            : 'translate-x-0 bg-white/40'
          }
        `}
      >
        {locked && (
          <svg className="w-2.5 h-2.5 text-[#1a1b2e]/60" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    </button>
  );
}

const categories = [
  {
    id: 'necessary',
    label: 'Necessary',
    description: 'Infrastructure logging, security, and site functionality. These cannot be disabled.',
    locked: true,
    defaultOn: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Anonymous usage statistics to help us improve the site. No analytics tools are currently active on this site.',
    locked: false,
    defaultOn: false,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Advertising and cross-site tracking. This site does not use marketing cookies or tracking.',
    locked: true,
    defaultOn: false,
  },
];

export default function ConsentPreferences({ onClose, onSave }) {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [animating, setAnimating] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const existing = getConsentData();
    if (existing?.preferences) {
      setPreferences({
        necessary: true,
        analytics: existing.preferences.analytics ?? false,
        marketing: false,
      });
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimating(true));
    });

    // Trap focus
    const handleTab = (e) => {
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
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
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleTab);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = useCallback(() => {
    setAnimating(false);
    setTimeout(() => onClose(), 200);
  }, [onClose]);

  const handleSave = useCallback(() => {
    setConsent(preferences);
    setAnimating(false);
    setTimeout(() => {
      if (onSave) onSave();
      else onClose();
    }, 200);
  }, [preferences, onSave, onClose]);

  const toggleCategory = useCallback((id, value) => {
    setPreferences(prev => ({ ...prev, [id]: value }));
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center p-4
        transition-opacity duration-200
        ${animating ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Privacy preferences"
        className={`
          relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto
          bg-[#14152a] border border-white/[0.08]
          rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)]
          transition-transform duration-200
          ${animating ? 'scale-100' : 'scale-95'}
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#14152a]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-5 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-white tracking-tight">Privacy Preferences</h2>
          <button
            onClick={handleClose}
            className="
              w-8 h-8 rounded-lg flex items-center justify-center
              text-white/40 hover:text-white hover:bg-white/[0.06]
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60
            "
            aria-label="Close preferences"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          <p className="text-[13px] text-white/50 leading-relaxed">
            Manage how your data is processed on this site. This site
            does not use cookies. Preferences are stored in your browser
            using localStorage and are never sent to our servers.
          </p>

          {/* Category cards */}
          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`
                  p-4 rounded-xl border transition-colors duration-200
                  ${cat.locked
                    ? 'bg-white/[0.01] border-white/[0.04]'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[14px] font-medium text-white">{cat.label}</span>
                    {cat.locked && (
                      <span className="text-[10px] uppercase tracking-wider text-white/30 font-semibold bg-white/[0.04] px-1.5 py-0.5 rounded">
                        {cat.defaultOn ? 'Required' : 'Unused'}
                      </span>
                    )}
                  </div>
                  <Toggle
                    id={`toggle-${cat.id}`}
                    enabled={preferences[cat.id]}
                    locked={cat.locked}
                    onChange={(val) => toggleCategory(cat.id, val)}
                  />
                </div>
                <p className="text-[12px] text-white/40 leading-relaxed pr-14">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#14152a]/95 backdrop-blur-xl border-t border-white/[0.06] px-6 py-5">
          <button
            onClick={handleSave}
            className="
              w-full py-2.5 rounded-xl text-[14px] font-medium
              text-white bg-violet-600 border border-violet-500/40
              hover:bg-violet-500 hover:border-violet-400/50
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#14152a]
            "
          >
            Save Preferences
          </button>

          <div className="flex items-center justify-center gap-4 mt-4 text-[12px]">
            <Link
              href="/privacy"
              className="text-white/40 hover:text-white/60 transition-colors"
              onClick={handleClose}
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/cookies"
              className="text-white/40 hover:text-white/60 transition-colors"
              onClick={handleClose}
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
