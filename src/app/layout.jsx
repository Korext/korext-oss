import '@/app/globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalBackground from '@/components/GlobalBackground';
import { organizationSchema, JsonLd } from '@/lib/schema';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Korext Open Source: AI Code Governance Standards and Tools',
  description: 'Free open source tools and standards for AI code transparency. Track AI generated code, declare provenance, scan your supply chain. Install in one command.',
  metadataBase: new URL('https://oss.korext.com'),
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    siteName: 'Korext Open Source',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <JsonLd data={organizationSchema()} />
        <GlobalBackground />
        <Header />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
