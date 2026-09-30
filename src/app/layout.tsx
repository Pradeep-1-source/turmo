import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  metadataBase: new URL('https://urbanfresh.in'),
  title: 'Urban Fresh | Premium Indian Agricultural Products & Global Export',
  description:
    'Urban Fresh supplies premium Indian agricultural and food products for global B2B buyers, with a focus on quality, responsible sourcing and export-ready supply.',
  keywords: [
    'Indian agricultural exporter',
    'Turmeric exporter India',
    'Cold pressed coconut oil export',
    'Groundnut oil wholesale B2B',
    'Erode turmeric fingers',
    'Urban Fresh exports',
  ],
  authors: [{ name: 'Urban Fresh' }],
  openGraph: {
    title: 'Urban Fresh | Premium Indian Agricultural Products & Global Export',
    description:
      'Grown with Care, Delivered Worldwide. Premium B2B export of turmeric, virgin coconut oil, and cold-pressed groundnut oil.',
    url: 'https://urbanfresh.in',
    siteName: 'Urban Fresh',
    images: [
      {
        url: '/images/urban-fresh-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Urban Fresh Logo and Brand',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/images/urban-fresh-logo.jpg',
    apple: '/images/urban-fresh-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Urban Fresh',
    description:
      'Premium Indian agricultural products and food exporter serving global B2B buyers.',
    url: 'https://urbanfresh.in',
    logo: 'https://urbanfresh.in/images/urban-fresh-logo.jpg',
    telephone: '+919884449843',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'D.No-48, VELLI VALASU, Attavanai Anumanpalli, PO: Arachalur',
      addressLocality: 'Erode',
      addressRegion: 'Tamil Nadu',
      postalCode: '638101',
      addressCountry: 'IN',
    },
    sameAs: ['https://wa.me/919884449843'],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-navy-dark text-slate-100 flex flex-col antialiased selection:bg-brand-green selection:text-navy-dark">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
