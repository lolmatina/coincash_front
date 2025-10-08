"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { LogOut, User } from "lucide-react"
import Image from "next/image"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <motion.header
      className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/" className="flex items-center gap-1">
              <div className="h-8 w-8 rounded-full flex items-center justify-center">
                <Image src="/logo.svg" alt="CoinCash" width={32} height={32} />
              </div>
              <span className="text-xl font-bold">COIN CASH</span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            {["Главная", "О компании", "Новости", "FAQ", "Отзывы", "Контакты"].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className={`text-sm font-medium ${
                  index === 0 ? "text-primary hover:text-primary/80" : "text-muted-foreground hover:text-foreground"
                } transition-colors`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{user?.name} {user?.lastname}</span>
                </div>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="hidden md:inline-flex hover:scale-105 transition-transform">
                    Профиль
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="hover:scale-105 transition-transform"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hidden md:inline-flex hover:scale-105 transition-transform">
                    Войти
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform">
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
