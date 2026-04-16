export default function sitemap() {
  const base = 'https://oss.korext.com';
  const now = new Date();

  return [
    { url: base, lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${base}/ai-attestation`, lastModified: now, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${base}/ai-license`, lastModified: now, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${base}/supply-chain`, lastModified: now, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${base}/supply-chain/registry`, lastModified: now, priority: 0.8, changeFrequency: 'daily' },
    { url: `${base}/incidents`, lastModified: now, priority: 0.9, changeFrequency: 'daily' },
    { url: `${base}/incidents/browse`, lastModified: now, priority: 0.8, changeFrequency: 'daily' },
    { url: `${base}/incidents/submit`, lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/regressions`, lastModified: now, priority: 0.9, changeFrequency: 'daily' },
    { url: `${base}/regressions/browse`, lastModified: now, priority: 0.8, changeFrequency: 'daily' },
    { url: `${base}/regressions/submit`, lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
  ];
}
