'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MinHeap } from '@/lib/data-structures'

interface StorePrice {
  storeId: string
  storeName: string
  price: number
  stock: number
  availability: boolean
}

interface InputComparison {
  inputId: string
  inputName: string
  stores: StorePrice[]
}

export default function PriceComparator() {
  const { token } = useAuth()
  const [comparisons, setComparisons] = useState<InputComparison[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchComparisons()
  }, [])

  const fetchComparisons = async () => {
    try {
      const response = await fetch(${process.env.NEXT_PUBLIC_API_BASE_URL}/price-comparator/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json() || []
        setComparisons(data)
      }
    } catch (error) {
      console.error('Error fetching comparisons:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getBestPrices = (stores: StorePrice[]) => {
    // Use MinHeap to efficiently find best prices
    const heap = new MinHeap<StorePrice>((a, b) => a.price - b.price)
    stores.forEach(store => heap.push(store))
    
    const best: StorePrice[] = []
    while (!heap.isEmpty() && best.length < 3) {
      const store = heap.pop()
      if (store) best.push(store)
    }
    return best
  }

  const filteredComparisons = comparisons.filter(comp =>
    comp.inputName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Compare Input Prices</h3>
        <Input
          placeholder="Search inputs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <Card className="p-8 text-center text-muted-foreground">Loading comparisons...</Card>
      ) : filteredComparisons.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No price comparisons available.
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredComparisons.map((comparison) => {
            const bestPrices = getBestPrices(comparison.stores)
            const avgPrice = comparison.stores.length > 0
              ? comparison.stores.reduce((sum, s) => sum + s.price, 0) / comparison.stores.length
              : 0

            return (
              <Card key={comparison.inputId} className="p-6">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-foreground">{comparison.inputName}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Average Price: <span className="font-bold text-primary">${avgPrice.toFixed(2)}</span>
                  </p>
                </div>

                {comparison.stores.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No stores available</p>
                ) : (
                  <div className="space-y-3">
                    {comparison.stores.sort((a, b) => a.price - b.price).map((store) => (
                      <div
                        key={store.storeId}
                        className={`p-4 rounded-lg border-2 transition ${
                          bestPrices.some(b => b.storeId === store.storeId)
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-muted/30'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <h5 className="font-medium text-foreground">{store.storeName}</h5>
                            <p className={`text-sm ${!store.availability ? 'text-destructive' : 'text-muted-foreground'}`}>
                              {store.availability ? `${store.stock} in stock` : 'Out of stock'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">${store.price.toFixed(2)}</p>
                            {bestPrices.some(b => b.storeId === store.storeId) && (
                              <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded inline-block mt-1">
                                Best Price
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
