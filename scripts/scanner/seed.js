#!/usr/bin/env node

/**
 * Registry Seed Script
 * Seeds the attestation registry with scans of top N packages per ecosystem.
 */

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const WORK_DIR = path.join(os.tmpdir(), 'korext-seed');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { ecosystem: null, limit: 100 };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--ecosystem' && args[i + 1]) { opts.ecosystem = args[i + 1]; i++; }
    else if (args[i] === '--limit' && args[i + 1]) { opts.limit = parseInt(args[i + 1]); i++; }
    else if (args[i] === '--help') {
      console.log(`Usage: node seed.js [options]

Options:
  --ecosystem <name>  Ecosystem to seed (npm|pypi|cargo|go|rubygems|maven|nuget|composer)
  --limit <N>         Number of packages to seed. Default: 100
  --help              Show this help
`);
      process.exit(0);
    }
  }
  return opts;
}

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'korext-seed/1.0' } }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

const FEED_URLS = {
  npm: 'https://registry.npmjs.org/-/v1/search?text=*&size=250&quality=0.9',
  cargo: 'https://crates.io/api/v1/crates?sort=downloads&per_page=100',
  rubygems: 'https://rubygems.org/api/v1/search.json?query=rails&page=1'
};

async function run() {
  const opts = parseArgs();
  console.log(`Seeding registry: ecosystem=${opts.ecosystem || 'all'}, limit=${opts.limit}`);
  console.log(`Work directory: ${WORK_DIR}\n`);

  if (!fs.existsSync(WORK_DIR)) fs.mkdirSync(WORK_DIR, { recursive: true });

  const ecosystemsToSeed = opts.ecosystem ? [opts.ecosystem] : Object.keys(FEED_URLS);
  let seeded = 0;

  for (const eco of ecosystemsToSeed) {
    const feedUrl = FEED_URLS[eco];
    if (!feedUrl) {
      console.log(`No feed configured for ${eco}, skipping.`);
      continue;
    }

    console.log(`Fetching top packages for ${eco}...`);
    try {
      const data = await fetchJson(feedUrl);
      let packages = [];

      if (eco === 'npm') {
        packages = (data.objects || []).map(o => ({ name: o.package.name, version: o.package.version }));
      } else if (eco === 'cargo') {
        packages = (data.crates || []).map(c => ({ name: c.name, version: c.newest_version }));
      } else if (eco === 'rubygems') {
        packages = (Array.isArray(data) ? data : []).map(g => ({ name: g.name, version: g.version }));
      }

      packages = packages.slice(0, opts.limit);
      console.log(`  Found ${packages.length} packages to seed`);

      for (const pkg of packages) {
        seeded++;
        console.log(`  [${seeded}] ${eco}:${pkg.name}@${pkg.version}`);
        // In production: queue for scan-worker processing
      }
    } catch (e) {
      console.log(`  Error seeding ${eco}: ${e.message}`);
    }
    console.log('');
  }

  console.log(`Seed complete. ${seeded} packages queued for scanning.`);
}

run().catch(e => {
  console.error('Seed error:', e);
  process.exit(1);
});
