'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Generator() {
  const [repoStr, setRepoStr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noticeData, setNoticeData] = useState(null);
  const [activeTab, setActiveTab] = useState('text');
  
  const handleGenerate = async (e) => {
    e.preventDefault();
    setError(null);
    setNoticeData(null);
    setLoading(true);
    
    try {
      const parts = repoStr.split('/');
      if (parts.length !== 2) {
        throw new Error('Please enter in format owner/repo');
      }
      const [owner, repo] = parts;
      
      const res = await fetch(`/api/badge/${owner}/${repo}`);
      if (!res.ok) {
        // Just triggering github fetch behind badge to pre-cache or error
      }
      
      // Let's actually fetch from the raw github url
      const urls = [
        `https://raw.githubusercontent.com/${owner}/${repo}/main/.ai-attestation.yaml`,
        `https://raw.githubusercontent.com/${owner}/${repo}/master/.ai-attestation.yaml`
      ];
      
      let fetchedContent = null;
      for (const url of urls) {
        const fetchRes = await fetch(url);
        if (fetchRes.ok) {
          fetchedContent = await fetchRes.text();
          break;
        }
      }
      
      if (!fetchedContent) {
         setError('This repository does not have an .ai-attestation.yaml file. Run npx @korext/ai-attestation init in your repo first.');
         setLoading(false);
         return;
      }
      
      // We will lazily parse using basic regex/split since js-yaml is not on client by default
      // But we can just pass it to an api endpoint!
      const generateResponse = await fetch('/api/ai-license-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ yamlText: fetchedContent, owner, repo })
      });
      
      if (!generateResponse.ok) {
         setError('Failed to process attestation file.');
         setLoading(false);
         return;
      }
      
      const data = await generateResponse.json();
      setNoticeData(data);
      
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  
  const handleCopy = () => {
     if (noticeData) {
       navigator.clipboard.writeText(activeTab === 'text' ? noticeData.text : noticeData.yaml);
       alert('Copied to clipboard!');
     }
  };
  
  const handleDownload = () => {
     if (noticeData) {
        const text = activeTab === 'text' ? noticeData.text : noticeData.yaml;
        const filename = activeTab === 'text' ? 'AI-LICENSE' : 'ai-license-notice.yaml';
        const blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
     }
  };

  return (
    <div className="bg-card w-full max-w-3xl mx-auto rounded-xl border border-border p-8 shadow-sm">
      <h3 className="text-2xl font-bold mb-4 font-mono">GENERATE YOUR NOTICE</h3>
      <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input 
          type="text" 
          value={repoStr}
          onChange={(e) => setRepoStr(e.target.value)}
          placeholder="e.g. Korext/ai-attestation"
          className="flex-1 bg-background border border-border rounded-lg px-4 py-2 font-mono"
        />
        <button 
          disabled={loading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2 rounded-lg font-bold transition-colors"
        >
          {loading ? 'GENERATING...' : 'GENERATE'}
        </button>
      </form>
      
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg font-mono">
          {error}
        </div>
      )}
      
      {noticeData && (
        <div className="mt-8">
          <div className="flex bg-muted/50 rounded-t-lg border border-border border-b-0 overflow-hidden">
            <button 
              className={`flex-1 py-3 text-sm font-bold font-mono tracking-wider ${activeTab === 'text' ? 'bg-background border-b-2 border-primary' : 'hover:bg-muted text-muted-foreground'}`}
              onClick={() => setActiveTab('text')}
            >
              AI-LICENSE (TEXT)
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-bold font-mono tracking-wider ${activeTab === 'yaml' ? 'bg-background border-b-2 border-primary' : 'hover:bg-muted text-muted-foreground'}`}
              onClick={() => setActiveTab('yaml')}
            >
              ai-license-notice.yaml
            </button>
          </div>
          <div className="border border-border rounded-b-lg p-4 bg-black/50">
            <pre className="font-mono text-sm overflow-x-auto text-green-400">
              {activeTab === 'text' ? noticeData.text : noticeData.yaml}
            </pre>
          </div>
          
          <div className="mt-4 flex gap-4">
             <button onClick={handleCopy} className="flex-1 border border-border hover:bg-muted py-2 rounded-lg font-bold">Copy {activeTab === 'text' ? 'Text' : 'YAML'}</button>
             <button onClick={handleDownload} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-lg font-bold">Download File</button>
          </div>
        </div>
      )}
    </div>
  );
}
