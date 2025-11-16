'use client'

import { useLanguage, type Language } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-1">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? '' : 'dark:bg-card dark:border-border dark:text-foreground'}
      >
        EN
      </Button>
      <Button
        variant={language === 'es' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('es')}
        className={language === 'es' ? '' : 'dark:bg-card dark:border-border dark:text-foreground'}
      >
        ES
      </Button>
    </div>
  )
}
