"use client"

import { motion } from "framer-motion"

export function Stats() {
  const stats = [
    { value: "5000+", label: "Клиентов", sublabel: "Довольных пользователей нашего сервиса" },
    { value: "≈ 5 МИНУТ", label: "В среднем", sublabel: "Среднее время обработки заявки" },
    { value: "10 сек.", label: "Обновления", sublabel: "Курсы обновляются каждые 10 секунд" },
    { value: "$2KK+", label: "Объем торгов", sublabel: "Общий объем обменных операций" },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-primary text-primary-foreground rounded-lg p-6 text-center hover:scale-105 transition-transform cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              <div className="text-sm opacity-90">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
