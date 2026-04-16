// SITE BRANDING (CRITICAL)
// Never use "Korext OSS" in any user-facing text.
// Always use "Korext Open Source" for the site name.

const SITE_NAME = 'Korext Open Source';
const SITE_URL = 'https://oss.korext.com';

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
  const ogImage = image || `${SITE_URL}/logo.png`;

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
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
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

export { SITE_NAME, SITE_URL };
