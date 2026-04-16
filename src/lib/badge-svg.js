export function generateBadge({ type, value }) {
  let leftText = 'AI';
  let rightText = value;
  let color = '#9f9f9f'; // Gray default

  if (type === 'GOVERNED') {
    leftText = 'AI Governed';
    const score = parseInt(value, 10);
    if (!isNaN(score)) {
      if (score >= 80) color = '#4c1'; // Green
      else if (score >= 50) color = '#dfb317'; // Yellow
      else color = '#fe7d37'; // Orange
      rightText = `${score}%`;
    }
  } else if (type === 'ASSISTED') {
    leftText = 'AI Assisted';
    color = '#007ec6'; // Blue
    rightText = `${value}%`;
  } else if (type === 'ERROR') {
    leftText = 'AI';
    rightText = 'Error';
    color = '#e05d44'; // Red
  } else {
    // NO_ATTESTATION
    leftText = 'AI';
    rightText = 'No Attestation';
    color = '#9f9f9f'; // Gray
  }

  // Very rough text width estimation (6.5px per char) + padding
  const leftWidth = Math.max(30, leftText.length * 7 + 10);
  const rightWidth = Math.max(30, rightText.length * 7 + 10);
  const totalWidth = leftWidth + rightWidth;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="${leftText}: ${rightText}">
  <title>${leftText}: ${rightText}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${leftWidth}" height="20" fill="#555"/>
    <rect x="${leftWidth}" width="${rightWidth}" height="20" fill="${color}"/>
    <rect width="${totalWidth}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
    <text aria-hidden="true" x="${(leftWidth / 2) * 10}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${(leftWidth - 10) * 10}">${leftText}</text>
    <text x="${(leftWidth / 2) * 10}" y="140" transform="scale(.1)" fill="#fff" textLength="${(leftWidth - 10) * 10}">${leftText}</text>
    <text aria-hidden="true" x="${(leftWidth + rightWidth / 2) * 10}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${(rightWidth - 10) * 10}">${rightText}</text>
    <text x="${(leftWidth + rightWidth / 2) * 10}" y="140" transform="scale(.1)" fill="#fff" textLength="${(rightWidth - 10) * 10}">${rightText}</text>
  </g>
</svg>`;
}
