// SITE BRANDING (CRITICAL)
// Never use "Korext OSS" in any user-facing text.
// Always use "Korext Open Source" for the site name.

const SITE_NAME = 'Korext Open Source';
const SITE_URL = 'https://oss.korext.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags = []
}) {
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image || OG_IMAGE;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@korext',
    },
    keywords: tags.join(', '),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

/**
 * Generate BreadcrumbList JSON-LD for subpages.
 * Used by schema.js to emit structured data per page.
 *
 * @param {Array<{name: string, href: string}>} items - Breadcrumb trail
 * @returns {object} BreadcrumbList schema.org object
 */
export function buildBreadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export { SITE_NAME, SITE_URL };
