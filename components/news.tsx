"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const articles = [
  {
    title: "Крупный майнер прекратил продажу биткоина и сфокусировался на Ethereum",
    description:
      "Компания Marathon Digital Holdings, один из крупнейших майнеров биткоина, объявила о прекращении продажи добытых монет и переключении внимания на майнинг Ethereum.",
    image: "/bitcoin-mining-operation.png",
  },
  {
    title: "Криптовалюта Cardano подорожала на 10% и вышла в топ-5 по рыночной капитализации",
    description:
      "Стоимость криптовалюты Cardano выросла на 10% за последние 24 часа, благодаря чему она вошла в пятерку крупнейших криптовалют по рыночной капитализации.",
    image: "/cardano-cryptocurrency-gold.jpg",
  },
  {
    title: "Биткоин падает на фоне геополитики и жестких заявлений ФРС",
    description:
      "Курс биткоина снизился на 5% после заявлений представителей ФРС о возможном ужесточении денежно-кредитной политики и на фоне геополитической напряженности.",
    image: "/bitcoin-coins-falling.jpg",
  },
]

export function News() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Оставайтесь в курсе <span className="text-primary">последних новостей</span>
          </h2>
          <p className="text-muted-foreground text-lg">Узнайте все о криптовалюте, чтобы начать инвестировать</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden bg-card border-border/40 group cursor-pointer hover:border-primary/50 transition-colors h-full">
                <div className="aspect-video overflow-hidden">
                  <motion.img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{article.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform">
            Все новости
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
