'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoginPage from '@/components/auth/login-page'
import DashboardRouter from '@/components/dashboard/dashboard-router'

export default function Home() {
  const { user, token } = useAuth()
  const router = useRouter()

  if (!user || !token) {
    return <LoginPage />
  }

  return <DashboardRouter />
}
