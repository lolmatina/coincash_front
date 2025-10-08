"use client"

import { Card } from "@/components/ui/card"
import { Shield, Zap, Smile } from "lucide-react"
import { motion } from "framer-motion"

export function Benefits() {
  return (
    <section className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ваш надежный партнер для покупки, продажи и обмена криптовалют
          </h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Наш сервис предоставляет все необходимые инструменты для безопасной и удобной работы с криптовалютами. Мы
            гарантируем прозрачность и минимальные комиссии, чтобы обеспечить безопасность ваших средств и данных.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Smile,
              title: "Без комиссии",
              description: "Мы не взимаем комиссию частным пользователям за обмен криптовалюты в рублях.",
            },
            {
              icon: Shield,
              title: "Безопасность данных",
              description:
                "Мы используем современные технологии и шифрование, чтобы обеспечить безопасность ваших средств и данных.",
            },
            {
              icon: Zap,
              title: "Удобство",
              description:
                "Простой и понятный интерфейс, а также круглосуточная поддержка, чтобы обеспечить безопасность ваших средств и данных.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <Card className="p-8 bg-card border-border/40 hover:border-primary/50 transition-colors h-full">
                <motion.div
                  className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <benefit.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
