'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import Sidebar from '../layout/sidebar'
import { Card } from '@/components/ui/card'

export default function AdminDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('users')

  const navItems = [
    { label: t('admin.users'), href: '#users', icon: '👥' },
    { label: t('admin.analytics'), href: '#analytics', icon: '📈' },
    { label: t('admin.system'), href: '#system', icon: '⚙️' },
  ]

  return (
    <div className="flex h-screen bg-background dark:bg-background">
      <Sidebar navItems={navItems} currentPath={`#${activeTab}`} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary dark:text-primary">
              {t('common.welcome')}, {user?.name}
            </h2>
            <p className="text-muted-foreground dark:text-muted-foreground mt-1">
              {t('admin.title')}
            </p>
          </div>

          <div className="flex gap-4 mb-6 flex-wrap">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => setActiveTab(item.href.slice(1))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === item.href.slice(1)
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80 dark:bg-muted dark:text-foreground dark:hover:bg-muted/80'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <Card className="p-8 text-center text-muted-foreground dark:text-muted-foreground dark:bg-card">
            {t('admin.comingSoon')}
          </Card>
        </div>
      </main>
    </div>
  )
}
