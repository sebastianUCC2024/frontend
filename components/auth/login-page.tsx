'use client'

import { Suspense, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'FARMER' | 'STORE' | 'BUYER' | 'ADMIN'>('FARMER')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { login, register } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await register({ username, email, password, name, role })
      }
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <Card className="w-full max-w-md p-8 dark:bg-card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2 dark:text-primary">AgriGo</h1>
          <p className="text-muted-foreground dark:text-muted-foreground">{t('auth.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="text-sm font-medium text-foreground dark:text-foreground">{t('auth.name')}</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('auth.placeholder.name')}
                  required={!isLogin}
                  className="dark:bg-background dark:text-foreground dark:border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground dark:text-foreground">{t('auth.username')}</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('auth.placeholder.username')}
                  required={!isLogin}
                  className="dark:bg-background dark:text-foreground dark:border-border"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-sm font-medium text-foreground dark:text-foreground">{t('auth.email')}</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.placeholder.email')}
              required
              className="dark:bg-background dark:text-foreground dark:border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground dark:text-foreground">{t('auth.password')}</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.placeholder.password')}
              required
              className="dark:bg-background dark:text-foreground dark:border-border"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-foreground dark:text-foreground">{t('auth.role')}</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground dark:bg-background dark:text-foreground dark:border-border"
              >
                <option value="FARMER">Farmer</option>
                <option value="STORE">Store</option>
                <option value="BUYER">Buyer</option>
              </select>
            </div>
          )}

          {error && <p className="text-destructive text-sm dark:text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('common.loading') : isLogin ? t('auth.login') : t('auth.register')}
          </Button>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-primary hover:underline dark:text-primary dark:hover:text-primary/80"
            >
              {isLogin ? t('auth.needAccount') : t('auth.haveAccount')}
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-muted dark:bg-muted rounded-md text-xs text-muted-foreground dark:text-muted-foreground">
          <p className="font-semibold mb-2">{t('auth.testCredentials')}:</p>
          <p>Farmer: farmer1 / password123</p>
          <p>Store: store1 / password123</p>
          <p>Admin: admin / admin123</p>
        </div>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
