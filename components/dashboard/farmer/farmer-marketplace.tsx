'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface FarmerProduct {
  id: string
  name: string
  price: number
  quantity: number
  cropType: string
  description: string
  createdAt: string
}

export default function FarmerMarketplace() {
  const { token } = useAuth()
  const [products, setProducts] = useState<FarmerProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    cropType: 'CORN',
    description: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/marketplace/products', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setProducts(await response.json() || [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/marketplace/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          quantity: parseFloat(formData.quantity),
          cropType: formData.cropType,
          description: formData.description,
        }),
      })

      if (response.ok) {
        setFormData({
          name: '',
          price: '',
          quantity: '',
          cropType: 'CORN',
          description: '',
        })
        setShowForm(false)
        await fetchProducts()
      }
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8080/marketplace/products/${productId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          await fetchProducts()
        }
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Marketplace Products</h3>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary">
          {showForm ? 'Cancel' : '+ Publish Product'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 bg-card">
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Product Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Organic Corn"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Price per Unit ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Quantity Available</label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="100"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Crop Type</label>
                <select
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="CORN">Corn</option>
                  <option value="WHEAT">Wheat</option>
                  <option value="RICE">Rice</option>
                  <option value="SOYBEAN">Soybean</option>
                </select>
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
              Publish Product
            </Button>
          </form>
        </Card>
      )}

      {isLoading ? (
        <Card className="p-8 text-center text-muted-foreground">Loading products...</Card>
      ) : products.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No products published yet. Share your harvest!
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="p-6 hover:shadow-lg transition flex flex-col">
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-foreground">{product.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium text-foreground">{product.cropType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-medium text-foreground">{product.quantity}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-medium text-foreground">Price:</span>
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                </div>
              </div>

              <Button
                onClick={() => handleDeleteProduct(product.id)}
                variant="outline"
                className="w-full mt-4 text-destructive"
              >
                Remove from Marketplace
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
