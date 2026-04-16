export default function VendorPortal() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-4">Vendor Portal</h1>
        <p className="text-white/50 mb-10">AI Tool Vendors can login here to request access to respond to patterns filed against their tools during the 7-day notification period, and mark issues as fixed.</p>
        
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Agent Verification Required</h2>
            <p className="text-white/50 mb-6">In order to gain access to edit test versions and respond publicly, your account must originate from a verified corporate domain.</p>
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-medium transition-colors border border-emerald-500/20 text-sm">Register as AI Vendor</button>
        </div>
      </div>
    </div>
  );
}
