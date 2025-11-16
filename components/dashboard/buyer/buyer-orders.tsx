'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

interface Order {
  id: string
  productName: string
  quantity: number
  totalPrice: number
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERED'
  orderDate: string
}

export default function BuyerOrders() {
  const [orders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch orders when needed
    setIsLoading(true)
    // Simulate fetch
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">My Orders</h3>

      {isLoading ? (
        <Card className="p-8 text-center text-muted-foreground">Loading orders...</Card>
      ) : orders.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No orders yet. Browse the marketplace and add items to your cart!
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{order.productName}</h4>
                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                    <div>
                      <span className="font-medium text-foreground">{order.quantity}</span>
                      <p className="text-muted-foreground">Quantity</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">${order.totalPrice}</span>
                      <p className="text-muted-foreground">Total</p>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
