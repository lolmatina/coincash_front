import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'CoinCash - Криптовалютная Торговая Платформа',
    template: '%s | CoinCash'
  },
  description: 'Профессиональная криптовалютная торговая платформа с передовыми инструментами анализа, безопасными транзакциями и круглосуточной поддержкой. Торгуйте Bitcoin, Ethereum и другими криптовалютами.',
  keywords: [
    'криптовалюта',
    'биткоин',
    'эфириум',
    'торговля',
    'крипто биржа',
    'блокчейн',
    'цифровые активы',
    'инвестиции',
    'финансы',
    'cryptocurrency',
    'bitcoin',
    'ethereum',
    'trading',
    'exchange'
  ],
  authors: [{ name: 'CoinCash Team' }],
  creator: 'CoinCash',
  publisher: 'CoinCash',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://coincash.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ru-RU': '/ru',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://coincash.com',
    title: 'CoinCash - Криптовалютная Торговая Платформа',
    description: 'Профессиональная криптовалютная торговая платформа с передовыми инструментами анализа, безопасными транзакциями и круглосуточной поддержкой.',
    siteName: 'CoinCash',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CoinCash - Криптовалютная Торговая Платформа',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoinCash - Криптовалютная Торговая Платформа',
    description: 'Профессиональная криптовалютная торговая платформа с передовыми инструментами анализа и безопасными транзакциями.',
    images: ['/twitter-image.png'],
    creator: '@coincash',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'finance',
  classification: 'Cryptocurrency Trading Platform',
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
