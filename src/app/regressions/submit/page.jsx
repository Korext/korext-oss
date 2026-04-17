import Link from 'next/link';

export default function SubmissionsForm() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Document a Pattern</h1>
        <p className="text-white/50 mb-10">Follow this wizard to document an AI tool regression pattern. Fill in as much context as possible. Remember: reproducibility over anecdotes.</p>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 sm:p-8 md:p-12">
          
          <div className="mb-8 flex justify-between border-b border-white/[0.1] pb-6">
            <span className="text-purple-400 font-semibold">1. Basics</span>
            <span className="text-white/30">2. Pattern Details</span>
            <span className="text-white/30">3. Reproduction & Fixes</span>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Title</label>
              <input type="text" className="w-full bg-[#0d0e1a] border border-white/[0.1] rounded-lg px-4 py-3 text-white/80 focus:outline-none focus:border-purple-500/50" placeholder="e.g. String concatenation in SQL WHERE clause" />
            </div>
            
            <div>
               <label className="block text-sm font-medium text-white/80 mb-2">Category</label>
               <select className="w-full bg-[#0d0e1a] border border-white/[0.1] rounded-lg px-4 py-3 text-white/80 focus:outline-none">
                 <option>security</option>
                 <option>correctness</option>
                 <option>performance</option>
               </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Severity</label>
               <select className="w-full bg-[#0d0e1a] border border-white/[0.1] rounded-lg px-4 py-3 text-white/80 focus:outline-none">
                 <option>medium</option>
                 <option>high</option>
                 <option>critical</option>
               </select>
            </div>

            <div className="pt-6">
               <button type="button" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-medium transition-colors text-sm">Next Step →</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
