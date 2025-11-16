'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Card } from '@/components/ui/card'

interface Product {
  id: string
  name: string
  price: number
  quantity: number
  farmerName: string
  cropType: string
  createdAt: string
}

export default function MarketplacePreview() {
  const { token } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(${process.env.NEXT_PUBLIC_API_BASE_URL}/marketplace/products', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setProducts(await response.json())
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Marketplace Products</h3>

      {isLoading ? (
        <Card className="p-8 text-center text-muted-foreground">Loading products...</Card>
      ) : products.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No products available yet.
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="p-4 hover:shadow-lg transition">
              <h4 className="font-semibold text-foreground mb-2">{product.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{product.cropType}</p>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Price:</span> ${product.price}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span> {product.quantity}
                </p>
                <p>
                  <span className="font-medium">Farmer:</span> {product.farmerName}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
