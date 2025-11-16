'use client'

import { useAuth } from '@/contexts/auth-context'
import FarmerDashboard from './farmer/farmer-dashboard'
import StoreDashboard from './store/store-dashboard'
import BuyerDashboard from './buyer/buyer-dashboard'
import AdminDashboard from './admin/admin-dashboard'

export default function DashboardRouter() {
  const { user } = useAuth()

  if (!user) return null

  switch (user.role) {
    case 'FARMER':
      return <FarmerDashboard />
    case 'STORE':
      return <StoreDashboard />
    case 'BUYER':
      return <BuyerDashboard />
    case 'ADMIN':
      return <AdminDashboard />
    default:
      return <div>Unknown role</div>
  }
}
