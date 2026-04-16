import { fetchAttestation } from '@/lib/github';
import { generateBadge } from '@/lib/badge-svg';
import { get, set } from '@/lib/cache';

export async function GET(request, context) {
  const { owner, repo } = await context.params;
  const cacheKey = `badge_${owner}_${repo}`;
  
  let svg = get(cacheKey);
  
  if (!svg) {
    const { data, found } = await fetchAttestation(owner, repo);
    
    let type, value;
    if (!found) {
      type = 'NO_ATTESTATION';
    } else if (data) {
      if (data.governance && data.governance.score !== null) {
        type = 'GOVERNED';
        value = data.governance.score;
      } else {
        type = 'ASSISTED';
        value = data.ai?.percentage || 0;
      }
    } else {
      type = 'ERROR';
    }
    
    svg = generateBadge({ type, value });
    set(cacheKey, svg, 3600 * 1000); // 1 hour TTL
  }
  
  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
