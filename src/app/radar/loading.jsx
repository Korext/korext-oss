export default function Loading() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-6 animate-pulse">
      <div className="container mx-auto max-w-6xl">
        {/* Hero skeleton */}
        <div className="text-center mb-16">
          <div className="h-6 w-32 bg-cyan-500/10 rounded-full mx-auto mb-6" />
          <div className="h-12 w-96 bg-white/[0.06] rounded-lg mx-auto mb-4" />
          <div className="h-5 w-full max-w-lg bg-white/[0.04] rounded mx-auto" />
        </div>

        {/* Stats row skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 border border-white/[0.06] rounded-xl bg-white/[0.02] text-center">
              <div className="h-8 w-16 bg-white/[0.06] rounded mx-auto mb-2" />
              <div className="h-4 w-24 bg-white/[0.04] rounded mx-auto" />
            </div>
          ))}
        </div>

        {/* Chart area skeleton */}
        <div className="h-80 border border-white/[0.06] rounded-xl bg-white/[0.02] mb-8" />
      </div>
    </div>
  );
}
