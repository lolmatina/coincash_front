"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error("Пожалуйста, заполните все поля")
      return
    }

    try {
      setIsLoading(true)
      await login(email, password)
      toast.success("Успешный вход в систему!")
      router.push("/")
    } catch (error: any) {
      toast.error(error.message || "Ошибка входа в систему")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Decorative coins */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative h-[600px]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Bitcoin coins */}
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 30% 30%, #FF8A5B, #FF6B3D 45%, #E85A2E 70%, #C44A20)",
                boxShadow:
                  "0 8px 32px rgba(255, 107, 61, 0.4), inset -4px -4px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 12px rgba(255, 138, 91, 0.4)",
                border: "3px solid rgba(255, 138, 91, 0.3)",
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <span className="text-5xl font-bold text-white drop-shadow-lg">₿</span>
            </motion.div>

            <motion.div
              className="absolute bottom-32 left-12 w-40 h-40 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 30% 30%, #FF8A5B, #FF6B3D 45%, #E85A2E 70%, #C44A20)",
                boxShadow:
                  "0 12px 40px rgba(255, 107, 61, 0.5), inset -5px -5px 15px rgba(0, 0, 0, 0.3), inset 5px 5px 15px rgba(255, 138, 91, 0.4)",
                border: "4px solid rgba(255, 138, 91, 0.3)",
              }}
              animate={{
                y: [0, 20, 0],
                rotate: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <span className="text-6xl font-bold text-white drop-shadow-lg">₿</span>
            </motion.div>

            <motion.div
              className="absolute bottom-12 right-32 w-36 h-36 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 30% 30%, #FF8A5B, #FF6B3D 45%, #E85A2E 70%, #C44A20)",
                boxShadow:
                  "0 10px 36px rgba(255, 107, 61, 0.45), inset -4px -4px 14px rgba(0, 0, 0, 0.3), inset 4px 4px 14px rgba(255, 138, 91, 0.4)",
                border: "3px solid rgba(255, 138, 91, 0.3)",
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 12, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <span className="text-5xl font-bold text-white drop-shadow-lg">₿</span>
            </motion.div>

            {/* Ethereum coins */}
            <motion.div
              className="absolute top-32 right-24 w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 30% 30%, #FF8A5B, #FF6B3D 45%, #E85A2E 70%, #C44A20)",
                boxShadow:
                  "0 8px 28px rgba(255, 107, 61, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.3), inset 3px 3px 10px rgba(255, 138, 91, 0.4)",
                border: "3px solid rgba(255, 138, 91, 0.3)",
              }}
              animate={{
                y: [0, 25, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 4.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <span className="text-4xl font-bold text-white drop-shadow-lg">Ξ</span>
            </motion.div>

            <motion.div
              className="absolute bottom-48 right-12 w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 30% 30%, #FF8A5B, #FF6B3D 45%, #E85A2E 70%, #C44A20)",
                boxShadow:
                  "0 8px 32px rgba(255, 107, 61, 0.4), inset -4px -4px 12px rgba(0, 0, 0, 0.3), inset 4px 4px 12px rgba(255, 138, 91, 0.4)",
                border: "3px solid rgba(255, 138, 91, 0.3)",
              }}
              animate={{
                y: [0, -18, 0],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 4.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              <span className="text-5xl font-bold text-white drop-shadow-lg">Ξ</span>
            </motion.div>

            {/* Litecoin coins */}
            <motion.div
              className="absolute top-48 left-32 w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 30% 30%, #FF8A5B, #FF6B3D 45%, #E85A2E 70%, #C44A20)",
                boxShadow:
                  "0 6px 24px rgba(255, 107, 61, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.3), inset 3px 3px 10px rgba(255, 138, 91, 0.4)",
                border: "2px solid rgba(255, 138, 91, 0.3)",
              }}
              animate={{
                y: [0, 22, 0],
                rotate: [0, -12, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              <span className="text-4xl font-bold text-white drop-shadow-lg">Ł</span>
            </motion.div>

            {/* Ripple (XRP) coins */}
            <motion.div
              className="absolute top-12 right-40 w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 30% 30%, #FF8A5B, #FF6B3D 45%, #E85A2E 70%, #C44A20)",
                boxShadow:
                  "0 8px 28px rgba(255, 107, 61, 0.4), inset -3px -3px 10px rgba(0, 0, 0, 0.3), inset 3px 3px 10px rgba(255, 138, 91, 0.4)",
                border: "3px solid rgba(255, 138, 91, 0.3)",
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 4.3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              <span className="text-3xl font-bold text-white drop-shadow-lg">XRP</span>
            </motion.div>
          </motion.div>

          {/* Right side - Login form */}
          <motion.div
            className="max-w-md mx-auto w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <div className="space-y-2 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-foreground">Войти в аккаунт</h1>
                <p className="text-muted-foreground">Получите доступ ко всем возможностям крипто торгов</p>
              </div>

              {/* Form fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input 
                    type="email" 
                    placeholder="Эл. почта" 
                    className="h-12 bg-card border-border" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Пароль"
                    className="h-12 bg-card border-border pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    Запомнить меня
                  </label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Забыли пароль?
                  </a>
                </div>

                <Button 
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Вход..." : "Войти"}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Нет аккаунта?{" "}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Зарегистрироваться
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
