export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Korext',
    url: 'https://korext.com',
    logo: 'https://oss.korext.com/korext-logo-1024.png',
    sameAs: [
      'https://github.com/korext',
      'https://www.npmjs.com/~korext'
    ]
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Korext Open Source',
    url: 'https://oss.korext.com',
    description: 'Open standards and tools for AI code transparency.',
    publisher: {
      '@type': 'Organization',
      name: 'Korext',
      url: 'https://korext.com',
    },
  };
}

export function softwareApplicationSchema({ name, description, url, downloadUrl, version, license, applicationCategory }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    downloadUrl,
    softwareVersion: version,
    license,
    operatingSystem: 'Any',
    applicationCategory,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: 'Korext', url: 'https://korext.com' }
  };
}

export function techArticleSchema({ headline, description, datePublished, dateModified, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline,
    description,
    datePublished,
    dateModified,
    url,
    author: { '@type': 'Organization', name: 'Korext' },
    publisher: {
      '@type': 'Organization',
      name: 'Korext',
      logo: { '@type': 'ImageObject', url: 'https://oss.korext.com/korext-logo-1024.png' }
    }
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function faqSchema(questions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer }
    }))
  };
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
