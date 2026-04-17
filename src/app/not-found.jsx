import Link from 'next/link';

export const metadata = {
  title: '404 | Korext Open Source',
  description: 'Page not found.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-2">
          <span className="text-4xl font-bold text-violet-400">404</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Page not found
        </h1>
        <p className="text-white/50 text-base leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-violet-600/80 text-white text-sm font-medium hover:bg-violet-500 transition-all border border-violet-500/30"
          >
            Go home
          </Link>
          <a
            href="https://github.com/korext"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-white/[0.04] text-white/60 text-sm font-medium hover:text-white hover:bg-white/[0.08] transition-all border border-white/[0.08]"
          >
            Browse on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
