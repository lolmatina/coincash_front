"use client"

import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { motion } from "framer-motion"
import { TradingPairs } from "./trading-pairs"
import { ExchangeWidget } from "./exchange-widget"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border/40 bg-card/50 backdrop-blur hover:scale-105 transition-transform"
            >
              <Send className="h-3 w-3 mr-2" />
              Присоединяйтесь к нам Telegram
            </Button>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-4">
              {/* <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-3xl">₿</div> */}
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Обмен криптовалют в Бишкеке
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-semibold text-primary">
              Лучший сервис по продаже и покупке криптовалют
            </p>
          </motion.div>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Лучший сервис по продаже и покупке криптовалют (Bitcoin, USDT и др.) доступен в нашем офисе!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-transform"
            >
              Начать обмен
            </Button>
            <Button size="lg" variant="outline" className="hover:scale-105 transition-transform bg-transparent">
              Войти
            </Button>
          </motion.div>

          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Нас уже более 5000
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <TradingPairs />
          <ExchangeWidget />
        </div>
      </div>
    </section>
  )
}
