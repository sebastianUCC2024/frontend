'use client'

import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'

interface NavItem {
  label: string
  href: string
  icon: string
}

interface SidebarProps {
  navItems: NavItem[]
  currentPath: string
}

export default function Sidebar({ navItems, currentPath }: SidebarProps) {
  const { logout, user } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col dark:bg-card dark:border-border">
      <div className="p-6 border-b border-border dark:border-border">
        <h1 className="text-2xl font-bold text-primary dark:text-primary">AgriGo</h1>
        <p className="text-sm text-muted-foreground dark:text-muted-foreground mt-1">{user?.role}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
              currentPath === item.href
                ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                : 'text-foreground hover:bg-muted dark:text-foreground dark:hover:bg-muted'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-border dark:border-border space-y-4">
        <div className="flex gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground dark:text-foreground">{user?.name}</span>
          </div>
          <Button onClick={handleLogout} variant="outline" className="w-full dark:bg-background dark:text-foreground dark:border-border">
            {t('dashboard.logout')}
          </Button>
        </div>
      </div>
    </aside>
  )
}
