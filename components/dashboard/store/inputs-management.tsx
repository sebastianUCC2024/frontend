'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface StoreInput {
  id: string
  name: string
  type: string
  quantity: number
  unit: string
  basePrice: number
  description: string
}

export default function InputsManagement() {
  const { token } = useAuth()
  const [inputs, setInputs] = useState<StoreInput[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'FERTILIZER',
    quantity: '',
    unit: 'kg',
    basePrice: '',
    description: '',
  })

  useEffect(() => {
    fetchInputs()
  }, [])

  const fetchInputs = async () => {
    try {
      const response = await fetch(${process.env.NEXT_PUBLIC_API_BASE_URL}/stores/inputs', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setInputs(await response.json() || [])
      }
    } catch (error) {
      console.error('Error fetching inputs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateInput = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(${process.env.NEXT_PUBLIC_API_BASE_URL}/stores/inputs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          quantity: parseFloat(formData.quantity),
          unit: formData.unit,
          basePrice: parseFloat(formData.basePrice),
          description: formData.description,
        }),
      })

      if (response.ok) {
        setFormData({
          name: '',
          type: 'FERTILIZER',
          quantity: '',
          unit: 'kg',
          basePrice: '',
          description: '',
        })
        setShowForm(false)
        await fetchInputs()
      }
    } catch (error) {
      console.error('Error creating input:', error)
    }
  }

  const handleDeleteInput = async (inputId: string) => {
    if (confirm('Are you sure you want to delete this input?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stores/inputs/${inputId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          await fetchInputs()
        }
      } catch (error) {
        console.error('Error deleting input:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Agricultural Inputs</h3>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary">
          {showForm ? 'Cancel' : '+ Add Input'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 bg-card">
          <form onSubmit={handleCreateInput} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Input Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., NPK Fertilizer 20-20-20"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="FERTILIZER">Fertilizer</option>
                  <option value="PESTICIDE">Pesticide</option>
                  <option value="SEED">Seed</option>
                  <option value="EQUIPMENT">Equipment</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="100"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="liter">Liter (L)</option>
                  <option value="unit">Units</option>
                  <option value="bag">Bags</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Base Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  placeholder="25.50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full bg-primary">
              Add Input
            </Button>
          </form>
        </Card>
      )}

      {isLoading ? (
        <Card className="p-8 text-center text-muted-foreground">Loading inputs...</Card>
      ) : inputs.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No inputs yet. Add your first product!
        </Card>
      ) : (
        <div className="grid gap-4">
          {inputs.map((input) => (
            <Card key={input.id} className="p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-foreground">{input.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{input.description}</p>
                  <div className="grid grid-cols-4 gap-4 mt-3 text-sm">
                    <div>
                      <span className="font-medium text-foreground">{input.type}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{input.quantity}</span> {input.unit}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">${input.basePrice}</span>/unit
                    </div>
                    <div className="text-right">
                      <Button
                        onClick={() => handleDeleteInput(input.id)}
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                      >
                        Delete
                      </Button>
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
