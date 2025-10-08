"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Header } from "@/components/header"
import { CheckCircle, Mail, FileText, Upload, Shield, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { apiClient } from "@/lib/api"

// Step 1: Email Verification Component
function EmailVerificationStep({ user, onComplete }: { user: any, onComplete: () => void }) {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleVerifyEmail = async () => {
    if (code.length !== 6) {
      toast.error("Код должен содержать 6 цифр")
      return
    }

    try {
      setIsLoading(true)
      await apiClient.verifyEmail(user.email, code)
      toast.success("Email успешно подтвержден!")
      onComplete()
    } catch (error: any) {
      toast.error(error.message || "Ошибка подтверждения email")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    try {
      setIsResending(true)
      await apiClient.resendVerificationCode(user.email)
      toast.success("Код подтверждения отправлен повторно")
    } catch (error: any) {
      toast.error(error.message || "Ошибка отправки кода")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Card className="p-8 text-center bg-card/50 backdrop-blur border-border/40">
        <div className="mb-6">
          <Mail className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">Подтверждение Email</h2>
          <p className="text-muted-foreground">
            Мы отправили код подтверждения на <strong className="text-foreground">{user?.email}</strong>
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Введите 6-значный код"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="text-center text-lg tracking-widest bg-card/80 border-border/40 text-foreground"
            maxLength={6}
          />
          
          <Button 
            onClick={handleVerifyEmail} 
            disabled={isLoading || code.length !== 6}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isLoading ? "Подтверждение..." : "Подтвердить Email"}
          </Button>

          <Button 
            variant="outline" 
            onClick={handleResendCode} 
            disabled={isResending}
            className="w-full border-border/40 text-foreground hover:bg-card/80"
          >
            {isResending ? "Отправка..." : "Отправить код повторно"}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

// Step 2: Document Upload Component
function DocumentUploadStep({ user, onComplete }: { user: any, onComplete: () => void }) {
  const [files, setFiles] = useState<{ front?: File, back?: File, selfie?: File }>({})
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (type: 'front' | 'back' | 'selfie', file: File) => {
    console.log(`File selected for ${type}:`, file.name, file.size, file.type)
    setFiles(prev => ({ ...prev, [type]: file }))
  }

  const handleUpload = async () => {
    console.log('Upload attempt - files:', files)
    
    if (!files.front || !files.back || !files.selfie) {
      console.log('Missing files:', { front: !!files.front, back: !!files.back, selfie: !!files.selfie })
      toast.error("Пожалуйста, загрузите все три документа")
      return
    }

    try {
      setIsUploading(true)
      console.log('Starting upload with files:', {
        front: files.front.name,
        back: files.back.name,
        selfie: files.selfie.name
      })
      
      await apiClient.uploadDocuments(user.email, files as { front: File, back: File, selfie: File })
      toast.success("Документы успешно загружены!")
      onComplete()
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(error.message || "Ошибка загрузки документов")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-8 bg-card/50 backdrop-blur border-border/40">
        <div className="text-center mb-8">
          <FileText className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">Загрузка Документов</h2>
          <p className="text-muted-foreground">
            Загрузите документы для верификации вашего аккаунта
          </p>
        </div>

        <div className="space-y-6">
          {/* Front Document */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Лицевая сторона документа *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileChange('front', e.target.files[0])}
              className="w-full px-3 py-2 bg-card/80 border border-border/40 rounded-md text-foreground cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            />
            {files.front && (
              <p className="text-sm text-green-500 mt-1">✓ {files.front.name}</p>
            )}
          </div>

          {/* Back Document */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Обратная сторона документа *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileChange('back', e.target.files[0])}
              className="w-full px-3 py-2 bg-card/80 border border-border/40 rounded-md text-foreground cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            />
            {files.back && (
              <p className="text-sm text-green-500 mt-1">✓ {files.back.name}</p>
            )}
          </div>

          {/* Selfie */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Фото с документом (селфи) *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileChange('selfie', e.target.files[0])}
              className="w-full px-3 py-2 bg-card/80 border border-border/40 rounded-md text-foreground cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            />
            {files.selfie && (
              <p className="text-sm text-green-500 mt-1">✓ {files.selfie.name}</p>
            )}
          </div>

          <Button 
            onClick={handleUpload} 
            disabled={isUploading || !files.front || !files.back || !files.selfie}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isUploading ? "Загрузка..." : "Загрузить Документы"}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

// Step 3: Verification Pending Component
function VerificationPendingStep({ user }: { user: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Card className="p-8 text-center bg-card/50 backdrop-blur border-border/40">
        <div className="mb-6">
          <Shield className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">Верификация в Процессе</h2>
          <p className="text-muted-foreground">
            Ваши документы находятся на рассмотрении. Мы уведомим вас о результате.
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            Обычно верификация занимает 1-3 рабочих дня
          </p>
        </div>
      </Card>
    </motion.div>
  )
}

// Step 4: Completed Profile Component
function CompletedProfileStep({ user }: { user: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-8 text-center bg-card/50 backdrop-blur border-border/40">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-foreground">Профиль Полностью Настроен!</h2>
          <p className="text-muted-foreground">
            Поздравляем! Ваш аккаунт полностью верифицирован
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-card/80 backdrop-blur border border-border/40 p-4 rounded-lg">
            <Mail className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="font-semibold text-foreground">Email Подтвержден</p>
            <p className="text-sm text-muted-foreground">
              {new Date(user?.email_verified_at).toLocaleDateString('ru-RU')}
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur border border-border/40 p-4 rounded-lg">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="font-semibold text-foreground">Документы Верифицированы</p>
            <p className="text-sm text-muted-foreground">
              {new Date(user?.documents_verified_at).toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" size="lg">
            Перейти к Торговле
          </Button>
          <Button variant="outline" className="w-full border-border/40 text-foreground hover:bg-card/80">
            Настройки Профиля
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

// Main Profile Page Component
export default function ProfilePage() {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState<number>(1)

  useEffect(() => {
    if (!user) return

    // Determine current step based on user's verification status
    if (!user.email_verified_at) {
      setCurrentStep(1) // Email verification
    } else if (!user.documents_submitted_at) {
      setCurrentStep(2) // Document upload
    } else if (!user.documents_verified_at) {
      setCurrentStep(3) // Verification pending
    } else {
      setCurrentStep(4) // Completed
    }
  }, [user])

  const handleStepComplete = () => {
    setCurrentStep(prev => prev + 1)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <EmailVerificationStep user={user} onComplete={handleStepComplete} />
      case 2:
        return <DocumentUploadStep user={user} onComplete={handleStepComplete} />
      case 3:
        return <VerificationPendingStep user={user} />
      case 4:
        return <CompletedProfileStep user={user} />
      default:
        return <EmailVerificationStep user={user} onComplete={handleStepComplete} />
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12">
          {/* User Info Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Профиль пользователя</h1>
            <p className="text-muted-foreground">
              Добро пожаловать, {user?.name} {user?.lastname}
            </p>
            <div className="mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user?.profile_type === 'company' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {user?.profile_type === 'company' ? '🏢 Корпоративный' : '👤 Личный'}
              </span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
              {[
                { number: 1, title: "Email", icon: Mail },
                { number: 2, title: "Документы", icon: FileText },
                { number: 3, title: "Проверка", icon: Shield },
                { number: 4, title: "Готово", icon: CheckCircle }
              ].map((step, index) => {
                const Icon = step.icon
                const isCompleted = currentStep > step.number
                const isCurrent = currentStep === step.number
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : isCurrent 
                        ? 'bg-orange-500 border-orange-500 text-white' 
                        : 'border-border/40 text-muted-foreground'
                    }`}>
                      {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < 3 && (
                      <div className={`w-8 h-0.5 mx-4 ${
                        isCompleted ? 'bg-green-500' : 'bg-border/40'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Current Step Content */}
          {renderCurrentStep()}
        </main>
      </div>
    </ProtectedRoute>
  )
}