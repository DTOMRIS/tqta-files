import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TQTA | Turan Qastro Turizm Akademiyası - Peşəkar Kulinariya Təhsili',
  description: 'Sumqayıtda beynəlxalq CTH sertifikatlı kulinariya və turizm təhsili. Pulsuz dövlət dəstəkli proqramlar, 90% işə düzəlmə zəmanəti. Aşpazlıq, barista, restoran idarəçiliyi kursları.',
  keywords: [
    'aspaz kurslari',
    'kulinariya tehsili',
    'TQTA',
    'Sumqayit tehsil',
    'CTH awards Azerbaijan',
    'gastronomi tehsili',
    'aspazliq kursu',
    'barista kursu',
    'restoran menecmenti',
    'turizm tehsili',
    'pulsuz tehsil',
    'ise duzelmek',
    'beynelxalq diplom'
  ],
  authors: [{ name: 'TQTA - Turan Qastro Turizm Akademiyası' }],
  creator: 'TQTA',
  publisher: 'TQTA',
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
  openGraph: {
    type: 'website',
    locale: 'az_AZ',
    url: 'https://tqta.az',
    siteName: 'TQTA - Turan Qastro Turizm Akademiyası',
    title: 'TQTA | Gələcəyin Şefi Olmağa Hazırsan?',
    description: 'Beynəlxalq standartlarda təhsil və qlobal karyera imkanları. 90% işə düzəlmə zəmanəti.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TQTA - Kulinariya Akademiyası',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TQTA | Peşəkar Kulinariya Təhsili',
    description: 'Sumqayıtda beynəlxalq CTH sertifikatlı təhsil. 90% işə düzəlmə zəmanəti.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://tqta.az',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'TQTA - Turan Qastro Turizm Akademiyası',
    description: 'Azərbaycanın peşəkar kulinariya və turizm təhsili mərkəzi. CTH beynəlxalq sertifikatlı proqramlar.',
    url: 'https://tqta.az',
    logo: 'https://tqta.az/logo.png',
    image: 'https://tqta.az/og-image.jpg',
    telephone: '+994517696181',
    email: 'info@tqta.az',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Səməd Vurğun küçəsi 84',
      addressLocality: 'Sumqayıt',
      addressCountry: 'AZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.5897,
      longitude: 49.6686,
    },
    sameAs: [
      'https://instagram.com/tqta.az',
      'https://facebook.com/tqta.az',
      'https://linkedin.com/company/tqta',
    ],
    offers: {
      '@type': 'Offer',
      category: 'Culinary Education',
      availableAtOrFrom: 'Sumqayıt, Azerbaijan',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'AZN',
        price: '0',
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
        },
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Təhsil Proqramları',
      itemListElement: [
        {
          '@type': 'Course',
          name: 'Professional Cookery',
          description: '2 aylıq peşəkar aşpazlıq kursu',
          provider: {
            '@type': 'Organization',
            name: 'TQTA',
          },
        },
        {
          '@type': 'Course',
          name: 'Turizm və Qonaqpərvərlik',
          description: '1 aylıq turizm menecmenti kursu',
          provider: {
            '@type': 'Organization',
            name: 'TQTA',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
