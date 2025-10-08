import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CoinCash - Криптовалютная Торговая Платформа',
    short_name: 'CoinCash',
    description: 'Профессиональная криптовалютная торговая платформа с передовыми инструментами анализа и безопасными транзакциями.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#f97316',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['finance', 'business'],
    lang: 'ru',
  }
}
