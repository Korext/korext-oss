'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-white/30 hover:text-white/50 transition-colors text-xs underline underline-offset-2 decoration-white/20"
    >
      Print this page
    </button>
  );
}
