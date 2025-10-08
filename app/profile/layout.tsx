import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Профиль пользователя',
  description: 'Управляйте своим профилем CoinCash. Верификация документов, настройки безопасности и личная информация.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Профиль пользователя | CoinCash',
    description: 'Управляйте своим профилем CoinCash. Верификация документов и настройки безопасности.',
  },
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
