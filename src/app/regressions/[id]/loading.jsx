export default function Loading() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-6 animate-pulse">
      <div className="container mx-auto max-w-4xl">
        <div className="h-4 w-48 bg-white/[0.04] rounded mb-8" />
        <div className="h-6 w-24 bg-purple-500/10 rounded-full mb-4" />
        <div className="h-9 w-full max-w-2xl bg-white/[0.06] rounded-lg mb-4" />
        <div className="h-5 w-full max-w-xl bg-white/[0.04] rounded mb-8" />
        <div className="flex gap-4 mb-10">
          <div className="h-4 w-24 bg-white/[0.04] rounded" />
          <div className="h-4 w-32 bg-white/[0.04] rounded" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 border border-white/[0.06] rounded-xl bg-white/[0.02]">
              <div className="h-5 w-40 bg-white/[0.06] rounded mb-4" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/[0.04] rounded" />
                <div className="h-4 w-3/4 bg-white/[0.03] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
