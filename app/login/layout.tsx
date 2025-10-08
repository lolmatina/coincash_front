import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Вход в аккаунт',
  description: 'Войдите в свой аккаунт CoinCash для доступа к криптовалютной торговой платформе. Безопасный вход с двухфакторной аутентификацией.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Вход в аккаунт | CoinCash',
    description: 'Войдите в свой аккаунт CoinCash для доступа к криптовалютной торговой платформе.',
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
