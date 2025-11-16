'use client'

import { Card } from '@/components/ui/card'

export default function SalesOverview() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Sales Overview</h3>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-muted-foreground text-sm">Total Sales</p>
          <p className="text-3xl font-bold text-primary mt-2">$0</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm">Orders This Month</p>
          <p className="text-3xl font-bold text-secondary mt-2">0</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm">Total Customers</p>
          <p className="text-3xl font-bold text-accent mt-2">0</p>
        </Card>
      </div>

      <Card className="p-8 text-center text-muted-foreground">
        Sales analytics coming soon...
      </Card>
    </div>
  )
}
