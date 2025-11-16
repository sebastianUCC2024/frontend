'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface InputPrice {
  id: string
  inputId: string
  inputName: string
  currentPrice: number
  stock: number
  lastUpdated: string
}

export default function PriceManagement() {
  const { token } = useAuth()
  const [prices, setPrices] = useState<InputPrice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState({ price: '', stock: '' })

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    try {
      const response = await fetch('http://localhost:8080/stores/inputs', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const inputs = await response.json() || []
        setPrices(inputs.map((inp: any) => ({
          id: inp.id,
          inputId: inp.id,
          inputName: inp.name,
          currentPrice: inp.basePrice,
          stock: inp.quantity,
          lastUpdated: new Date().toISOString(),
        })))
      }
    } catch (error) {
      console.error('Error fetching prices:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePrice = async (inputId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/stores/inputs/${inputId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          basePrice: parseFloat(editData.price),
          quantity: parseFloat(editData.stock),
        }),
      })

      if (response.ok) {
        setEditingId(null)
        setEditData({ price: '', stock: '' })
        await fetchPrices()
      }
    } catch (error) {
      console.error('Error updating price:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Price & Stock Management</h3>

      {isLoading ? (
        <Card className="p-8 text-center text-muted-foreground">Loading prices...</Card>
      ) : prices.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No inputs available. Create inputs first!
        </Card>
      ) : (
        <div className="grid gap-4">
          {prices.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition">
              {editingId === item.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Price ($)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                        placeholder={item.currentPrice.toString()}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Stock</label>
                      <Input
                        type="number"
                        value={editData.stock}
                        onChange={(e) => setEditData({ ...editData, stock: e.target.value })}
                        placeholder={item.stock.toString()}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdatePrice(item.id)}
                      className="flex-1 bg-primary"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-lg text-foreground">{item.inputName}</h4>
                    <div className="grid grid-cols-3 gap-6 mt-3 text-sm">
                      <div>
                        <span className="font-medium text-foreground">${item.currentPrice}</span>
                        <p className="text-muted-foreground">Current Price</p>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{item.stock}</span>
                        <p className="text-muted-foreground">In Stock</p>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">
                          {new Date(item.lastUpdated).toLocaleDateString()}
                        </span>
                        <p className="text-muted-foreground">Last Updated</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setEditingId(item.id)
                      setEditData({ price: item.currentPrice.toString(), stock: item.stock.toString() })
                    }}
                    className="bg-secondary text-secondary-foreground"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
