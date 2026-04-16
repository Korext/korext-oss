import { fetchAttestation } from '@/lib/github';
import Link from 'next/link';

export async function generateMetadata(context) {
  const { owner, repo } = await context.params;
  return {
    title: `${owner}/${repo} | AI Attestation`,
    description: `AI Code Attestation Report for ${owner}/${repo}`,
  };
}

export default async function ReportPage(context) {
  const { owner, repo } = await context.params;
  const { data, url, found } = await fetchAttestation(owner, repo);

  if (!found || !data) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center space-y-8">
        <h1 className="text-3xl font-bold">{owner}/{repo}</h1>
        <div className="p-8 border border-border bg-card rounded-xl space-y-6">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">No Attestation Found</h2>
            <p className="text-muted-foreground">This repository does not have an attestation yet. Private repo support is coming soon.</p>
          </div>
          <div className="pt-4 space-y-3">
             <p className="text-sm font-medium">Run this command in your repo to generate your attestation:</p>
             <code className="block bg-background border border-border p-3 rounded text-left select-all text-sm">
               npx @korext/ai-attestation init
             </code>
          </div>
        </div>
      </div>
    );
  }

  // Calculate fields
  const generatedDate = data.generated ? new Date(data.generated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown';
  const totalCommits = data.range?.commits || 0;
  const aiCommits = data.ai?.assisted_commits || 0;
  const aiPercentage = data.ai?.percentage || 0;
  const tools = data.ai?.tools || [];
  
  const hasGovernance = data.governance?.engine != null;
  const isGovernedPass = data.governance?.result === 'PASS';
  const isGovernedBlock = data.governance?.result === 'BLOCK';
  
  const govScore = data.governance?.score;
  const findings = data.governance?.findings || { critical: 0, high: 0, medium: 0, low: 0 };
  const govCardClass = hasGovernance 
    ? (isGovernedBlock ? 'border-red-900/50 bg-red-900/10' : 'border-green-900/50 bg-green-900/10')
    : 'border-border bg-card';

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
      
      {/* Header */}
      <div className="border-b border-border pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-blue-400">AI Attestation</div>
          <h1 className="text-3xl md:text-4xl font-bold">{owner} / {repo}</h1>
          <div className="text-muted-foreground flex items-center gap-4 text-sm pt-2">
            <span>Generated: {generatedDate}</span>
            <span>Commits scanned: {totalCommits.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <a href={`https://github.com/${owner}/${repo}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
            View on GitHub
          </a>
          <a href={url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
            View raw file
          </a>
        </div>
      </div>

      {/* Overview & Governance Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* AI Overview */}
        <div className="p-6 md:p-8 bg-card border border-border rounded-xl space-y-6">
          <h3 className="text-lg font-semibold text-muted-foreground">AI Overview</h3>
          <div>
            <div className="text-5xl font-bold text-blue-400">{aiPercentage}%</div>
            <div className="text-lg font-medium text-foreground mt-2">AI Assisted</div>
            <p className="text-muted-foreground text-sm mt-1">{aiCommits.toLocaleString()} of {totalCommits.toLocaleString()} commits</p>
          </div>
          {/* Simple progress bar in pure CSS/HTML */}
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${aiPercentage}%` }} />
          </div>
        </div>

        {/* Governance */}
        <div className={`p-6 md:p-8 border rounded-xl space-y-6 ${govCardClass}`}>
          <h3 className="text-lg font-semibold text-muted-foreground">Governance</h3>
          
          {!hasGovernance ? (
            <div className="space-y-4">
              <p className="text-foreground font-medium">No governance engine configured.</p>
              <p className="text-muted-foreground text-sm">
                This repository tracks AI code but does not scan it for compliance.
              </p>
              <a href="https://korext.com" target="_blank" rel="noreferrer" className="inline-block mt-2 px-4 py-2 bg-secondary hover:bg-muted text-sm font-medium rounded transition">
                Add Governance with KOREXT
              </a>
            </div>
          ) : (
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-muted-foreground">Engine</span>
                 <span className="font-semibold">{data.governance.engine}</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-muted-foreground">Last scan</span>
                 <span className="text-sm">{data.governance.last_scan ? new Date(data.governance.last_scan).toLocaleString() : 'N/A'}</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-muted-foreground">Score</span>
                 <span className={`text-lg font-bold ${isGovernedBlock ? 'text-red-400' : 'text-green-400'}`}>{govScore}/100</span>
               </div>
               <div className="pt-2 border-t border-border/50">
                 <div className="text-xs text-muted-foreground mb-2">Findings</div>
                 <div className="grid grid-cols-4 gap-2 text-center text-sm">
                   <div className="bg-background py-1 rounded border border-border"><span className="block text-red-500 font-bold">{findings.critical}</span> CRIT</div>
                   <div className="bg-background py-1 rounded border border-border"><span className="block text-orange-500 font-bold">{findings.high}</span> HIGH</div>
                   <div className="bg-background py-1 rounded border border-border"><span className="block text-yellow-500 font-bold">{findings.medium}</span> MED</div>
                   <div className="bg-background py-1 rounded border border-border"><span className="block text-blue-500 font-bold">{findings.low}</span> LOW</div>
                 </div>
               </div>
               {data.governance.proof_bundle_url && (
                 <a href={data.governance.proof_bundle_url} target="_blank" rel="noreferrer" className="inline-block w-full text-center mt-2 px-4 py-2 bg-background border border-border hover:bg-muted text-sm font-medium rounded transition">
                   View Proof Bundle
                 </a>
               )}
            </div>
          )}
        </div>
      </div>

      {/* Tools Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Tools Detected</h3>
        {tools.length === 0 ? (
          <div className="p-6 bg-card border border-border rounded-xl text-center text-muted-foreground">
            No AI tools detected in the commit history.
          </div>
        ) : (
          <div className="overflow-x-auto border border-border rounded-xl bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Tool</th>
                  <th className="px-6 py-4 font-medium">Commits</th>
                  <th className="px-6 py-4 font-medium">First Seen</th>
                  <th className="px-6 py-4 font-medium">Last Seen</th>
                  <th className="px-6 py-4 font-medium">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tools.map((tool) => {
                  const share = aiCommits > 0 ? ((tool.commit_count / aiCommits) * 100).toFixed(1) : 0;
                  return (
                    <tr key={tool.identifier} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{tool.name}</td>
                      <td className="px-6 py-4">{tool.commit_count.toLocaleString()}</td>
                      <td className="px-6 py-4">{tool.first_seen || 'Unknown'}</td>
                      <td className="px-6 py-4">{tool.last_seen || 'Unknown'}</td>
                      <td className="px-6 py-4">{share}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Policy */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Policy</h3>
        <div className="p-6 bg-card border border-border rounded-xl space-y-4 text-sm">
           {(!data.policy || Object.keys(data.policy).length === 0 || (
              data.policy.ai_code_requires_review === false && 
              data.policy.minimum_governance_score === null && 
              data.policy.block_unscanned_ai_code === false && 
              (data.policy.mandatory_packs || []).length === 0
           )) ? (
             <p className="text-muted-foreground">No policy configured.</p>
           ) : (
             <div className="grid md:grid-cols-2 gap-4">
               {data.policy.ai_code_requires_review !== undefined && (
                 <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Review required for AI code</span>
                    <span className="font-medium">{data.policy.ai_code_requires_review ? 'Yes' : 'No'}</span>
                 </div>
               )}
               {data.policy.block_unscanned_ai_code !== undefined && (
                 <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Block unscanned AI code</span>
                    <span className="font-medium">{data.policy.block_unscanned_ai_code ? 'Yes' : 'No'}</span>
                 </div>
               )}
               {data.policy.minimum_governance_score !== null && data.policy.minimum_governance_score !== undefined && (
                 <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Min governance score</span>
                    <span className="font-medium">{data.policy.minimum_governance_score}</span>
                 </div>
               )}
               {data.policy.mandatory_packs && data.policy.mandatory_packs.length > 0 && (
                 <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Mandatory packs</span>
                    <span className="font-medium">{data.policy.mandatory_packs.join(', ')}</span>
                 </div>
               )}
             </div>
           )}
        </div>
      </div>

      {/* Badge Embed */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h3 className="text-xl font-bold">Add to README</h3>
        <p className="text-muted-foreground text-sm">Add this badge to your README to show your AI code attestation.</p>
        <div className="p-4 bg-muted border border-border rounded flex items-center justify-center my-4 min-h-[60px]">
           <img src={`https://oss.korext.com/badge/${owner}/${repo}`} alt="AI Attestation" />
        </div>
        <pre className="p-4 bg-background border border-border rounded overflow-x-auto text-sm text-foreground">
          <code>{`[![AI Attestation](https://oss.korext.com/badge/${owner}/${repo})](https://oss.korext.com/report/${owner}/${repo})`}</code>
        </pre>
      </div>
      
    </div>
  );
}
