export default function Loading() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-6 animate-pulse">
      <div className="container mx-auto max-w-5xl">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-48 bg-white/[0.04] rounded mb-8" />

        {/* Title skeleton */}
        <div className="h-10 w-80 bg-white/[0.06] rounded-lg mb-4" />
        <div className="h-5 w-full max-w-xl bg-white/[0.04] rounded mb-2" />
        <div className="h-5 w-96 bg-white/[0.04] rounded mb-10" />

        {/* Search bar skeleton */}
        <div className="h-12 w-full bg-white/[0.03] border border-white/[0.06] rounded-xl mb-8" />

        {/* Results skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-5 border border-white/[0.06] rounded-xl bg-white/[0.02]">
              <div className="h-5 w-64 bg-white/[0.06] rounded mb-3" />
              <div className="h-4 w-full max-w-lg bg-white/[0.04] rounded mb-2" />
              <div className="h-4 w-48 bg-white/[0.03] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
