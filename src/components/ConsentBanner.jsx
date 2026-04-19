'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { hasConsented, setConsent } from '@/lib/consent';
import ConsentPreferences from './ConsentPreferences';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    if (hasConsented()) return;

    const timer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setAnimating(false);
    setTimeout(() => setVisible(false), 300);
  }, []);

  const handleAccept = useCallback(() => {
    setConsent({ analytics: false, marketing: false });
    dismiss();
  }, [dismiss]);

  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && visible && !showPreferences) {
      handleAccept();
    }
  }, [visible, showPreferences, handleAccept]);

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [visible, handleEscape]);

  const handlePreferencesSaved = useCallback(() => {
    setShowPreferences(false);
    dismiss();
  }, [dismiss]);

  if (!visible && !showPreferences) return null;

  return (
    <>
      {visible && (
        <aside
          role="complementary"
          aria-label="Privacy consent"
          className={`
            fixed bottom-0 left-0 right-0 z-[9998]
            flex justify-center
            pointer-events-none
            transition-all duration-300 ease-out
            ${animating
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
            }
          `}
          style={{
            transitionProperty: 'transform, opacity',
          }}
        >
          <div className="
            pointer-events-auto
            w-full max-w-[800px]
            mx-4 mb-4 sm:mx-6 sm:mb-6
            bg-[#14152a]/95 backdrop-blur-xl
            border border-white/[0.08]
            rounded-2xl
            shadow-[0_-8px_40px_rgba(0,0,0,0.4),0_-2px_16px_rgba(124,58,237,0.06)]
            p-5 sm:p-6
          ">
            {/* Heading */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h2 className="text-[15px] font-medium text-white tracking-tight">
                We respect your privacy
              </h2>
            </div>

            {/* Body */}
            <p className="text-[13px] text-white/55 leading-relaxed mb-4 pl-[42px]">
              This site does not use cookies, analytics, or tracking.
              We process server logs for infrastructure purposes and
              collect personal data only when you voluntarily submit it
              through forms.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pl-[42px]">
              <div className="flex items-center gap-4 text-[13px]">
                <Link
                  href="/privacy"
                  className="text-violet-400/80 hover:text-violet-300 transition-colors underline underline-offset-2 decoration-violet-400/30"
                  onClick={dismiss}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/cookies"
                  className="text-violet-400/80 hover:text-violet-300 transition-colors underline underline-offset-2 decoration-violet-400/30"
                  onClick={dismiss}
                >
                  Cookie Policy
                </Link>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-auto">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="
                    px-4 py-2 rounded-lg text-[13px] font-medium
                    text-white/70 bg-white/[0.04] border border-white/[0.08]
                    hover:bg-white/[0.08] hover:text-white hover:border-white/[0.12]
                    transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#14152a]
                  "
                  tabIndex={0}
                >
                  Preferences
                </button>
                <button
                  onClick={handleAccept}
                  className="
                    px-5 py-2 rounded-lg text-[13px] font-medium
                    text-white bg-violet-600 border border-violet-500/40
                    hover:bg-violet-500 hover:border-violet-400/50
                    transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#14152a]
                  "
                  tabIndex={0}
                  autoFocus
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {showPreferences && (
        <ConsentPreferences
          onClose={() => setShowPreferences(false)}
          onSave={handlePreferencesSaved}
        />
      )}
    </>
  );
}
