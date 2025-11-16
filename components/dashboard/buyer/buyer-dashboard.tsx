'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import Sidebar from '../layout/sidebar'
import MarketplaceBrowser from './marketplace-browser'
import BuyerOrders from './buyer-orders'
import PriceComparator from './price-comparator'

export default function BuyerDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'marketplace' | 'orders' | 'comparator'>('marketplace')

  const navItems = [
    { label: t('buyer.marketplace'), href: '#marketplace', icon: '🛍️' },
    { label: t('buyer.orders'), href: '#orders', icon: '📦' },
    { label: t('buyer.comparator'), href: '#comparator', icon: '📊' },
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
              {t('buyer.title')}
            </p>
          </div>

          <div className="flex gap-4 mb-6 flex-wrap">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => setActiveTab(item.href.slice(1) as any)}
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

          <div className="space-y-6">
            {activeTab === 'marketplace' && <MarketplaceBrowser />}
            {activeTab === 'orders' && <BuyerOrders />}
            {activeTab === 'comparator' && <PriceComparator />}
          </div>
        </div>
      </main>
    </div>
  )
}
