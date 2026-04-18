import { NextResponse } from 'next/server';

// ── Rate limiter (in-memory, per-instance) ──
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const POST_LIMIT = 60;
const GET_API_LIMIT = 120;

function rateLimit(ip, limit) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count++;
  return entry.count > limit;
}

// Cleanup stale entries every 5 minutes
if (typeof globalThis.__rateLimitCleanup === 'undefined') {
  globalThis.__rateLimitCleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, val] of rateLimitMap) {
      if (now - val.start > RATE_LIMIT_WINDOW * 2) rateLimitMap.delete(key);
    }
  }, 300_000);
}

// ── Security headers ──
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'X-DNS-Prefetch-Control': 'on',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.github.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Skip processing for API routes — the Google Frontend proxy
  // (custom domain) causes issues with catch-all [...name] route
  // params when middleware rewrites are applied
  if (url.pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    for (const [key, value] of Object.entries(securityHeaders)) {
      response.headers.set(key, value);
    }
    return response;
  }

  // Lowercase enforcement (pages only)
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }

  // Trailing slash removal (except root)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/$/, '');
    return NextResponse.redirect(url, 308);
  }

  // Rate limiting for API routes
  if (url.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const method = request.method;

    if (method === 'POST') {
      // Body size check (100KB limit)
      const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
      if (contentLength > 102400) {
        return new NextResponse(JSON.stringify({ error: 'Request body too large' }), {
          status: 413,
          headers: { 'Content-Type': 'application/json', ...securityHeaders },
        });
      }

      if (rateLimit(`post:${ip}`, POST_LIMIT)) {
        return new NextResponse(JSON.stringify({ error: 'Too many requests. Try again later.' }), {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
            ...securityHeaders,
          },
        });
      }
    } else if (rateLimit(`get:${ip}`, GET_API_LIMIT)) {
      return new NextResponse(JSON.stringify({ error: 'Too many requests. Try again later.' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          ...securityHeaders,
        },
      });
    }
  }

  const response = NextResponse.next();

  // Apply security headers to all responses
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  // Immutable cache for static assets
  if (url.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/image|favicon.ico|favicon.png|logo.png|apple-touch-icon.png|korext-logo-1024.png|og-image.png|opengraph-image|twitter-image|team|api/supply-chain/badge|api/badge|api/ai-license-badge).*)'],
};
