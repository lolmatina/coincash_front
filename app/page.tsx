import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Features } from "@/components/features"
import { CryptoCards } from "@/components/crypto-cards"
import { Benefits } from "@/components/benefits"
import { News } from "@/components/news"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Добро пожаловать на CoinCash - ведущую криптовалютную торговую платформу. Торгуйте Bitcoin, Ethereum и другими цифровыми активами с передовыми инструментами анализа и максимальной безопасностью.',
  openGraph: {
    title: 'CoinCash - Главная',
    description: 'Добро пожаловать на CoinCash - ведущую криптовалютную торговую платформу. Торгуйте Bitcoin, Ethereum и другими цифровыми активами.',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'CoinCash - Главная страница',
      },
    ],
  },
  twitter: {
    title: 'CoinCash - Главная',
    description: 'Добро пожаловать на CoinCash - ведущую криптовалютную торговую платформу.',
    images: ['/twitter-home.png'],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <CryptoCards />
        <Benefits />
        <News />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
