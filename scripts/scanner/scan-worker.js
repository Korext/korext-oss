#!/usr/bin/env node

/**
 * Scanner Worker
 * Polls each ecosystem's "recent publications" feed, resolves repository URLs,
 * shallow clones, runs ai-attestation scan, and uploads results to the registry.
 */

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ECOSYSTEMS = {
  npm: {
    feedUrl: 'https://registry.npmjs.org/-/v1/search?text=*&size=50&quality=0.5',
    parsePackages(data) {
      return (data.objects || []).map(o => ({
        name: o.package.name,
        version: o.package.version,
        repo: o.package.links && o.package.links.repository
      }));
    }
  },
  pypi: {
    feedUrl: 'https://pypi.org/rss/updates.xml',
    parsePackages(data) { return []; } // XML parsing needed for RSS
  },
  cargo: {
    feedUrl: 'https://crates.io/api/v1/crates?sort=recent-updates&per_page=50',
    parsePackages(data) {
      return (data.crates || []).map(c => ({
        name: c.name,
        version: c.newest_version,
        repo: c.repository
      }));
    }
  },
  rubygems: {
    feedUrl: 'https://rubygems.org/api/v1/activity/latest.json',
    parsePackages(data) {
      return (Array.isArray(data) ? data : []).map(g => ({
        name: g.name,
        version: g.version,
        repo: g.source_code_uri || g.homepage_uri
      }));
    }
  }
};

const RATE_LIMIT = parseInt(process.env.SCANNER_RATE_LIMIT || '500');
const WORK_DIR = path.join(os.tmpdir(), 'korext-scanner');

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'korext-scanner/1.0' } }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error('Invalid JSON from ' + url)); }
      });
    }).on('error', reject);
  });
}

async function scanPackage(pkg) {
  if (!pkg.repo) return { status: 'no_source', name: pkg.name };

  const cloneDir = path.join(WORK_DIR, pkg.name.replace(/\//g, '_'));
  try {
    // Clean previous attempt
    if (fs.existsSync(cloneDir)) {
      fs.rmSync(cloneDir, { recursive: true, force: true });
    }

    // Shallow clone
    execSync(`git clone --depth 1 "${pkg.repo}" "${cloneDir}"`, { stdio: 'pipe', timeout: 30000 });

    // Check for existing attestation
    const attestPath = path.join(cloneDir, '.ai-attestation.yaml');
    if (fs.existsSync(attestPath)) {
      const content = fs.readFileSync(attestPath, 'utf8');
      return { status: 'success', name: pkg.name, version: pkg.version, attestation: content, source: 'repository' };
    }

    // Run ai-attestation scan if available
    try {
      execSync(`npx @korext/ai-attestation scan`, { cwd: cloneDir, stdio: 'pipe', timeout: 60000 });
      if (fs.existsSync(attestPath)) {
        const content = fs.readFileSync(attestPath, 'utf8');
        return { status: 'success', name: pkg.name, version: pkg.version, attestation: content, source: 'scanner' };
      }
    } catch (e) {
      // ai-attestation not available or failed
    }

    return { status: 'no_attestation', name: pkg.name };
  } catch (e) {
    return { status: 'scan_failed', name: pkg.name, error: e.message };
  } finally {
    // Cleanup
    try { if (fs.existsSync(cloneDir)) fs.rmSync(cloneDir, { recursive: true, force: true }); } catch (e) {}
  }
}

async function run() {
  console.log('Supply Chain Attestation Scanner');
  console.log(`Rate limit: ${RATE_LIMIT} packages per ecosystem per hour`);
  console.log(`Work directory: ${WORK_DIR}\n`);

  if (!fs.existsSync(WORK_DIR)) fs.mkdirSync(WORK_DIR, { recursive: true });

  const results = { total: 0, success: 0, noSource: 0, noAttestation: 0, failed: 0 };

  for (const [ecosystem, config] of Object.entries(ECOSYSTEMS)) {
    console.log(`Scanning ${ecosystem}...`);

    try {
      const data = await fetchJson(config.feedUrl);
      const packages = config.parsePackages(data).slice(0, RATE_LIMIT);
      console.log(`  Found ${packages.length} recent packages`);

      for (const pkg of packages) {
        results.total++;
        const result = await scanPackage(pkg);

        switch (result.status) {
          case 'success':
            results.success++;
            console.log(`  [OK] ${pkg.name}@${pkg.version}`);
            // In production: upload to registry storage
            break;
          case 'no_source':
            results.noSource++;
            break;
          case 'no_attestation':
            results.noAttestation++;
            break;
          case 'scan_failed':
            results.failed++;
            console.log(`  [FAIL] ${pkg.name}: ${result.error}`);
            break;
        }
      }
    } catch (e) {
      console.log(`  Error polling ${ecosystem} feed: ${e.message}`);
    }

    console.log('');
  }

  console.log('Scanner Summary:');
  console.log(`  Total: ${results.total}`);
  console.log(`  Success: ${results.success}`);
  console.log(`  No source: ${results.noSource}`);
  console.log(`  No attestation: ${results.noAttestation}`);
  console.log(`  Failed: ${results.failed}`);
}

run().catch(e => {
  console.error('Scanner error:', e);
  process.exit(1);
});
