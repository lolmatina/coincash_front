"use client"

import { motion } from "framer-motion"

export function Features() {
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Ведущая платформа для <span className="text-primary">покупки и продажи криптовалют</span>
          </h2>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Удобный сервис для торговли и управления цифровыми активами — под любые потребности. Поддержка ваших
            средств, автоматизация, безопасность, мгновенные транзакции.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
