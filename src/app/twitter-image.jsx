import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Korext Open Source: Open Standards for AI Code Governance';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const projects = [
  { name: 'AI Attestation', step: 'Track', color: '#3b82f6' },
  { name: 'AI License', step: 'Declare', color: '#8b5cf6' },
  { name: 'Supply Chain', step: 'Scan', color: '#10b981' },
  { name: 'Incidents', step: 'Learn', color: '#ef4444' },
  { name: 'Regressions', step: 'Prevent', color: '#a855f7' },
  { name: 'Code Radar', step: 'Observe', color: '#06b6d4' },
  { name: 'Commit Carbon', step: 'Account', color: '#22c55e' },
];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 64px 48px',
          fontFamily: 'Inter, system-ui, sans-serif',
          background: '#0d0e1a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial gradient overlays matching the website body background */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '30%',
            width: '800px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.2), transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-100px',
            width: '600px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.12), transparent 70%)',
          }}
        />

        {/* Top: Badge + Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 1 }}>
          {/* Status badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              alignSelf: 'flex-start',
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
              7 Open Standards
            </span>
          </div>

          {/* Main heading with gradient */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div
              style={{
                fontSize: '56px',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: 'white',
              }}
            >
              Open standards for
            </div>
            <div
              style={{
                fontSize: '56px',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AI code transparency
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.5,
              maxWidth: '620px',
            }}
          >
            Free tools and open specifications for tracking, declaring, and governing AI generated code.
          </div>
        </div>

        {/* Bottom: Pipeline steps + brand */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Pipeline steps */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {projects.map((p) => (
              <div
                key={p.step}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  minWidth: '90px',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: p.color,
                    boxShadow: `0 0 12px ${p.color}60`,
                  }}
                />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                  {p.step}
                </span>
              </div>
            ))}
          </div>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Korext
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
              Open Source
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
