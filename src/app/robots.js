export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://oss.korext.com/sitemap.xml',
    host: 'https://oss.korext.com',
  };
}
