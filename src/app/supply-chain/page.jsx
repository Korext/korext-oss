import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { JsonLd, softwareApplicationSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Supply Chain Attestation: AI Provenance Across Your Dependency Tree',
  description: 'Scan your entire dependency tree for AI generated code. Fourteen ecosystems. CycloneDX and SPDX integration. Private registry support. Install with npx in one command.',
  path: '/supply-chain',
  tags: ['supply chain attestation', 'AI provenance', 'dependency scanning', 'SBOM', 'CycloneDX', 'SPDX', 'npm', 'PyPI', 'Cargo', 'Go', 'Maven', 'NuGet', 'Composer', 'RubyGems'],
});

export default function SupplyChainPage() {
  const ecosystems = [
    { name: 'npm', desc: 'package-lock.json, yarn.lock' },
    { name: 'PyPI', desc: 'poetry.lock, Pipfile.lock, requirements.txt' },
    { name: 'Cargo', desc: 'Cargo.lock, Cargo.toml' },
    { name: 'Go Modules', desc: 'go.sum, go.mod' },
    { name: 'RubyGems', desc: 'Gemfile.lock' },
    { name: 'Maven', desc: 'pom.xml, build.gradle' },
    { name: 'NuGet', desc: '.csproj, packages.config' },
    { name: 'Composer', desc: 'composer.lock, composer.json' },
    { name: 'Swift PM', desc: 'Package.resolved, Package.swift' },
    { name: 'CocoaPods', desc: 'Podfile.lock, Podfile' },
    { name: 'Pub', desc: 'pubspec.lock, pubspec.yaml' },
    { name: 'Hex', desc: 'mix.lock, mix.exs' },
    { name: 'CPAN', desc: 'cpanfile.snapshot, META.json' },
    { name: 'Conda', desc: 'conda-lock.yml, environment.yml' },
  ];

  const exampleOutput = `Supply Chain Attestation

Ecosystem: npm
Dependencies: 847 total, 823 scanned

AI Coverage: 127 dependencies (15.4%)
Weighted AI Percentage: 28.3%

Governance Distribution:
  ATTESTED: 12 dependencies
  SCANNED: 89 dependencies
  UNGOVERNED: 722 dependencies
  NO_ATTESTATION: 24 dependencies

High Risk Dependencies: 3
  some-small-lib@2.0.0: 89% AI, ungoverned
  another-lib@1.2.3: 65% AI, ungoverned
  one-more@0.9.0: 72% AI, no attestation

Report: .supply-chain-attestation.yaml`;

  return (
    <div className="py-12 md:py-20">
      <JsonLd data={breadcrumbSchema([
        { name: 'Korext Open Source', url: 'https://oss.korext.com' },
        { name: 'Supply Chain Attestation', url: 'https://oss.korext.com/supply-chain' },
      ])} />
      <JsonLd data={softwareApplicationSchema({
        name: 'Supply Chain Attestation',
        description: 'AI provenance scanner for your software supply chain. Fourteen ecosystems, SBOM integration, private registry support.',
        url: 'https://oss.korext.com/supply-chain',
        downloadUrl: 'https://www.npmjs.com/package/@korext/supply-check',
        version: '1.1.1',
        license: 'https://opensource.org/licenses/Apache-2.0',
        applicationCategory: 'DeveloperApplication',
      })} />

      <div className="container mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 max-w-5xl">

        {/* Breadcrumb */}
        <nav className="text-sm text-white/30">
          <Link href="/" className="hover:text-white/60 transition-colors">Korext Open Source</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">Supply Chain Attestation</span>
        </nav>

        {/* Hero */}
        <div className="text-center space-y-6 max-w-3xl mx-auto -mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-medium text-emerald-400 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Category Creating
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08]">
            Know your supply chain&apos;s AI
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">
            AI provenance across every dependency in your project. Fourteen ecosystems. CycloneDX and SPDX integration. Private registry support.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <code className="px-4 sm:px-8 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm sm:text-lg font-mono text-white/80 select-all break-all">
              npx @korext/supply-check scan
            </code>
          </div>
        </div>

        {/* The Problem */}
        <div className="max-w-3xl mx-auto text-center space-y-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02] p-5 sm:p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white">The gap in supply chain tooling</h2>
          <p className="text-lg text-white/40 leading-relaxed">
            You know your vulnerabilities thanks to Snyk and Dependabot. You know your licenses thanks to FOSSA. But you do not know what percentage of your software supply chain was written with AI assistance.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 pt-6 text-left">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient">14</div>
              <p className="text-sm text-white/40">ecosystems supported at launch</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient">2</div>
              <p className="text-sm text-white/40">SBOM formats (CycloneDX 1.6, SPDX 2.3)</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient">0</div>
              <p className="text-sm text-white/40">existing tools that track AI across dependencies</p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          <div className="bg-[#0d0e1a] p-5 sm:p-8 space-y-4">
            <h3 className="text-xl font-semibold text-white">Scan</h3>
            <p className="text-white/40 leading-relaxed text-[15px]">
              One command scans your lockfile, enumerates every dependency, and queries the attestation registry for AI provenance data.
            </p>
          </div>
          <div className="bg-[#0d0e1a] p-5 sm:p-8 space-y-4">
            <h3 className="text-xl font-semibold text-white">Report</h3>
            <p className="text-white/40 leading-relaxed text-[15px]">
              Get a full breakdown: weighted AI percentage, governance tiers, high risk dependencies, and tool distribution across your supply chain.
            </p>
          </div>
          <div className="bg-[#0d0e1a] p-5 sm:p-8 space-y-4">
            <h3 className="text-xl font-semibold text-white">Enforce</h3>
            <p className="text-white/40 leading-relaxed text-[15px]">
              Set policies in CI. Block ungoverned AI dependencies. Require attestation for critical packages. Export CycloneDX or SPDX.
            </p>
          </div>
        </div>

        {/* Example output */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">One command, full visibility</h2>
            <p className="text-white/40 text-lg leading-relaxed">
              Supply Chain Attestation scans your dependency tree and produces a complete YAML report showing how much of your supply chain is AI generated, which tools were used, and which dependencies are high risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/supply-chain/registry" className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-500 transition border border-emerald-500/30 text-center">
                Browse Registry
              </Link>
              <a href="https://github.com/korext/supply-chain-attestation" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-white/[0.04] text-white font-medium rounded-xl hover:bg-white/[0.08] transition border border-white/[0.08] text-center">
                Star on GitHub
              </a>
            </div>
          </div>
          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-white/[0.03] px-5 py-3 flex items-center gap-2 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <div className="ml-4 text-xs font-medium text-white/30 tracking-wider font-mono">supply-check scan</div>
            </div>
            <pre className="p-6 text-sm overflow-x-auto text-white/60 font-mono leading-relaxed">
              <code>{exampleOutput}</code>
            </pre>
          </div>
        </div>

        {/* Fourteen Ecosystems */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">Fourteen Ecosystems at Launch</h2>
            <p className="text-white/40">Every major package manager. All ready in v1.0.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ecosystems.map(eco => (
              <div key={eco.name} className="p-5 border border-white/[0.06] bg-white/[0.02] rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">{eco.name}</span>
                </div>
                <p className="text-xs text-white/30 font-mono">{eco.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SBOM + CI */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 sm:p-8 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-5">
            <h3 className="text-xl font-semibold text-white">SBOM Integration</h3>
            <p className="text-white/40 leading-relaxed text-[15px]">
              Export your supply chain as CycloneDX 1.6 or SPDX 2.3 with AI properties embedded via standard extension mechanisms. Compatible with any SBOM consumer.
            </p>
            <code className="block text-sm font-mono text-white/60 px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-lg select-all">
              supply-check sbom --format cyclonedx
            </code>
          </div>
          <div className="p-5 sm:p-8 border border-white/[0.06] bg-white/[0.02] rounded-2xl space-y-5">
            <h3 className="text-xl font-semibold text-white">CI/CD Policy Gate</h3>
            <p className="text-white/40 leading-relaxed text-[15px]">
              GitHub Action enforces your policy. Set maximum AI percentage, block ungoverned dependencies, require attestation for critical packages.
            </p>
            <code className="block text-sm font-mono text-white/60 px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-lg select-all break-all">
              uses: korext/supply-chain-attestation/action@v1
            </code>
          </div>
        </div>

        {/* Enterprise */}
        <div className="max-w-3xl mx-auto text-center space-y-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Private Registry for Enterprises</h2>
          <p className="text-lg text-white/40 leading-relaxed">
            Host your own registry for internal packages. Mirror the public registry for full coverage. Four storage backends. Docker, Kubernetes, and Docker Compose manifests included.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a href="https://github.com/korext/supply-chain-attestation/blob/main/docs/PRIVATE-REGISTRY.md" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-white/[0.04] text-white font-medium rounded-xl hover:bg-white/[0.08] transition border border-white/[0.08]">
              Deploy Private Registry
            </a>
          </div>
        </div>

        {/* Specification */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-5 sm:p-8 border border-white/[0.06] bg-white/[0.02] rounded-2xl text-center space-y-6">
            <h3 className="text-xl font-semibold text-white">Read the Specification</h3>
            <p className="text-white/40">
              The full specification is CC0 1.0 (public domain). Open standard, no restrictions.
            </p>
            <a href="https://github.com/korext/supply-chain-attestation/blob/main/SPEC.md" target="_blank" rel="noreferrer" className="inline-block px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-500 transition border border-emerald-500/30">
              View SPEC.md
            </a>
          </div>
          <div className="p-5 sm:p-8 border border-white/[0.06] bg-white/[0.02] rounded-2xl text-center space-y-6">
            <h3 className="text-xl font-semibold text-white">Open Source</h3>
            <p className="text-white/40">
              Help us expand ecosystem coverage and build the attestation registry.
            </p>
            <a href="https://github.com/korext/supply-chain-attestation" target="_blank" rel="noreferrer" className="inline-block px-6 py-2.5 bg-white/[0.04] text-white font-medium rounded-xl hover:bg-white/[0.08] transition border border-white/[0.08]">
              Star on GitHub
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
