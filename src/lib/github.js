import { parseAttestation } from './yaml';

export async function fetchAttestation(owner, repo) {
  const urls = [
    `https://raw.githubusercontent.com/${owner}/${repo}/main/.ai-attestation.yaml`,
    `https://raw.githubusercontent.com/${owner}/${repo}/master/.ai-attestation.yaml`,
    `https://raw.githubusercontent.com/${owner}/${repo}/main/.ai-attestation.json`,
    `https://raw.githubusercontent.com/${owner}/${repo}/master/.ai-attestation.json`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
          : {},
        cache: 'no-store'
      });
      if (res.ok) {
        const text = await res.text();
        const isYaml = url.endsWith('.yaml');
        const data = parseAttestation(text, isYaml);
        if (data) {
          return { data, url, found: true };
        }
      }
    } catch (e) {
      continue;
    }
  }

  return { data: null, url: null, found: false };
}
