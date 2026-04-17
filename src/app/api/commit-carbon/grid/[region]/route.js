import { NextResponse } from 'next/server';

const REGION_DATA = {
  US: { intensity: 369, source: 'IEA 2024', name: 'United States' },
  EU: { intensity: 241, source: 'IEA 2024', name: 'European Union' },
  CN: { intensity: 543, source: 'IEA 2024', name: 'China' },
  IN: { intensity: 628, source: 'IEA 2024', name: 'India' },
  JP: { intensity: 462, source: 'IEA 2024', name: 'Japan' },
  GB: { intensity: 195, source: 'IEA 2024', name: 'United Kingdom' },
  FR: { intensity: 58, source: 'IEA 2024', name: 'France' },
  DE: { intensity: 357, source: 'IEA 2024', name: 'Germany' },
  CA: { intensity: 120, source: 'IEA 2024', name: 'Canada' },
  AU: { intensity: 510, source: 'IEA 2024', name: 'Australia' },
  BR: { intensity: 61, source: 'IEA 2024', name: 'Brazil' },
  KR: { intensity: 415, source: 'IEA 2024', name: 'South Korea' },
  SE: { intensity: 13, source: 'IEA 2024', name: 'Sweden' },
  NO: { intensity: 8, source: 'IEA 2024', name: 'Norway' },
  IS: { intensity: 0, source: 'IEA 2024', name: 'Iceland' },
  NZ: { intensity: 82, source: 'IEA 2024', name: 'New Zealand' },
  SG: { intensity: 395, source: 'IEA 2024', name: 'Singapore' },
  ZA: { intensity: 709, source: 'IEA 2024', name: 'South Africa' },
  PL: { intensity: 635, source: 'IEA 2024', name: 'Poland' },
  IT: { intensity: 315, source: 'IEA 2024', name: 'Italy' },
  ES: { intensity: 161, source: 'IEA 2024', name: 'Spain' },
  NL: { intensity: 286, source: 'IEA 2024', name: 'Netherlands' },
  CH: { intensity: 16, source: 'IEA 2024', name: 'Switzerland' },
  AT: { intensity: 93, source: 'IEA 2024', name: 'Austria' },
  DK: { intensity: 109, source: 'IEA 2024', name: 'Denmark' },
  FI: { intensity: 67, source: 'IEA 2024', name: 'Finland' },
  IE: { intensity: 253, source: 'IEA 2024', name: 'Ireland' },
  PT: { intensity: 148, source: 'IEA 2024', name: 'Portugal' },
};

export async function GET(request, context) {
  const { region } = await context.params;
  const upper = (region || '').toUpperCase();

  const data = REGION_DATA[upper];
  if (!data) {
    return NextResponse.json({
      region: upper,
      intensity_gco2e_per_kwh: 475,
      source: 'IEA World Average 2024',
      name: 'World Average (fallback)',
      note: `Region '${upper}' not found. Using world average.`,
      available_regions: Object.keys(REGION_DATA).sort(),
    }, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }

  return NextResponse.json({
    region: upper,
    intensity_gco2e_per_kwh: data.intensity,
    source: data.source,
    name: data.name,
    unit: 'gCO2e/kWh',
    data_type: 'annual_average',
  }, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
}
