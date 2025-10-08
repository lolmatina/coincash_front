import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Регистрация',
  description: 'Создайте аккаунт на CoinCash и получите доступ ко всем возможностям крипто торговли. Быстрая регистрация с верификацией документов.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Регистрация | CoinCash',
    description: 'Создайте аккаунт на CoinCash и получите доступ ко всем возможностям крипто торговли.',
  },
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
