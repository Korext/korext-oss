import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, max-age=3600',
};

const VALID_METRICS = ['languages', 'tools', 'ecosystems', 'industries', 'regions', 'governance', 'maturity'];

const BUCKET = 'korext-radar-data';
const OBJECT = 'current.json';
const GCS_URL = `https://storage.googleapis.com/${BUCKET}/${OBJECT}`;

// In-memory cache to avoid hitting GCS on every request within the hour
let cachedData = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Loads radar data with a 3-tier fallback:
 * 1. In-memory cache (< 5 min old)
 * 2. GCS bucket (production, updated hourly by aggregator)
 * 3. Local public/radar-data/current.json (development fallback)
 */
async function loadData() {
  const now = Date.now();

  // Tier 1: in-memory cache
  if (cachedData && (now - cacheTimestamp) < CACHE_TTL_MS) {
    return cachedData;
  }

  // Tier 2: GCS bucket (production)
  try {
    const res = await fetch(GCS_URL, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      cachedData = data;
      cacheTimestamp = now;
      return data;
    }
  } catch {
    // GCS unreachable, fall through
  }

  // Tier 3: local file (development)
  try {
    const localPath = path.join(process.cwd(), 'public', 'radar-data', 'current.json');
    if (fs.existsSync(localPath)) {
      const data = JSON.parse(fs.readFileSync(localPath, 'utf-8'));
      cachedData = data;
      cacheTimestamp = now;
      return data;
    }
  } catch {
    // local file missing
  }

  return null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const metric = searchParams.get('metric');

  try {
    const data = await loadData();
    if (!data) {
      return NextResponse.json(
        { error: 'Data not initialized yet. The aggregator runs hourly. Check back soon.' },
        { status: 503, headers: CORS_HEADERS }
      );
    }

    if (!metric) {
      return NextResponse.json(data, { headers: CORS_HEADERS });
    }

    const keyMap = {
      languages: 'by_language',
      tools: 'by_tool',
      ecosystems: 'by_ecosystem',
      industries: 'by_industry',
      regions: 'by_region',
      governance: 'governance_insights',
      maturity: 'by_maturity',
    };

    const dataKey = keyMap[metric];
    if (!dataKey || !data[dataKey]) {
      return NextResponse.json(
        { error: `Metric "${metric}" not found. Valid metrics: ${VALID_METRICS.join(', ')}` },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      { metric, data: data[dataKey], computed_at: data.computed_at, quality: data.quality },
      { headers: CORS_HEADERS }
    );
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
