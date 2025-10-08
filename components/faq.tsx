"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "Как пройти верификацию личности?",
    answer:
      "Для прохождения верификации необходимо загрузить фото документа, удостоверяющего личность, и селфи с этим документом.",
  },
  {
    question: "Для чего нужна верификация аккаунта?",
    answer: "Верификация аккаунта необходима для обеспечения безопасности и соблюдения требований законодательства.",
  },
  {
    question: "Как зарегистрироваться на CoinCash и начать со мной?",
    answer: 'Нажмите кнопку "Регистрация" в верхнем правом углу и следуйте инструкциям на экране.',
  },
  {
    question: "Как добавить новую платежку?",
    answer: 'Перейдите в настройки профиля и выберите раздел "Платежные методы", затем нажмите "Добавить".',
  },
  {
    question: "По какому курсу вы покупаете?",
    answer: "Курс обновляется каждые 10 секунд и отображается на главной странице для каждой криптовалюты.",
  },
  {
    question: "Могу ли получить свои деньги?",
    answer: "Да, вы можете вывести средства в любое время через доступные платежные методы.",
  },
  {
    question: "Как вывести с CoinCash на другую биржу?",
    answer: "Используйте функцию вывода криптовалюты, указав адрес кошелька на другой бирже.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">FAQ</h2>
            <p className="text-muted-foreground mb-8 text-center">Найдите ответы на интересующие вопросы</p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4 mb-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border/40 rounded-lg px-6 hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform">
              Все вопрос-ответы
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
