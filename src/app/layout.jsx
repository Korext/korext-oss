import '@/app/globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalBackground from '@/components/GlobalBackground';
import ConsentBanner from '@/components/ConsentBanner';
import { organizationSchema, webSiteSchema, JsonLd } from '@/lib/schema';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Korext Open Source: AI Code Governance Standards and Tools',
  description: 'Free open source tools and standards for AI code transparency. Track AI generated code, declare provenance, scan your supply chain. Install in one command.',
  metadataBase: new URL('https://oss.korext.com'),
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    siteName: 'Korext Open Source',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@korext',
    creator: '@korext',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'theme-color': '#0d0e1a',
    'color-scheme': 'dark',
    'msapplication-TileColor': '#0d0e1a',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="//api.github.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        {/* Skip to main content link for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[99999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-violet-600 focus:text-white focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#0d0e1a]"
        >
          Skip to main content
        </a>
        <GlobalBackground />
        <Header />
        <main id="main-content" className="flex-1 relative z-10" role="main">
          {children}
        </main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
