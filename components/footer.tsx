"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-background" />
              </div>
              <span className="text-xl font-bold">COIN CASH</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Все права защищены. 2025.</p>
          </motion.div>

          {[
            {
              title: "Поддержка сайт",
              items: ["+996 (501) 777-444", "08:00 - 22:00", "info@coincash.kg"],
            },
            {
              title: "Настройки сообщек",
              items: ["О компании", "Новости", "FAQ", "Контакты"],
            },
            {
              title: "Регистрация",
              items: ["Регистрация", "Войти в личный кабинет", "Забыли пароль?"],
            },
          ].map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + columnIndex * 0.1 }}
            >
              <h3 className="font-semibold mb-4 text-primary">{column.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {column.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + columnIndex * 0.1 + itemIndex * 0.05 }}
                  >
                    {columnIndex === 0 ? (
                      item
                    ) : (
                      <a href="#" className="hover:text-foreground transition-colors">
                        {item}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="font-semibold mb-4 text-primary">Условия использования</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Публичная оферта", "Политика", "Конфиденциальность", "Лицензия"].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                >
                  <a href="#" className="hover:text-foreground transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
