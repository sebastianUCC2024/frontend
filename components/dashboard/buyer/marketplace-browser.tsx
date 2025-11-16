'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface MarketplaceProduct {
  id: string
  name: string
  price: number
  quantity: number
  farmerName: string
  farmerId: string
  cropType: string
  description: string
  createdAt: string
}

export default function MarketplaceBrowser() {
  const { token } = useAuth()
  const [products, setProducts] = useState<MarketplaceProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<MarketplaceProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [cropFilter, setCropFilter] = useState('ALL')

  const cropTypes = ['ALL', 'CORN', 'WHEAT', 'RICE', 'SOYBEAN']

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchTerm, cropFilter, products])

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

  const filterProducts = () => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (cropFilter !== 'ALL') {
      filtered = filtered.filter(p => p.cropType === cropFilter)
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="Search products by name or farmer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          value={cropFilter}
          onChange={(e) => setCropFilter(e.target.value)}
          className="px-4 py-2 border border-input rounded-md bg-background text-foreground"
        >
          {cropTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <Card className="p-8 text-center text-muted-foreground">Loading marketplace...</Card>
      ) : filteredProducts.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No products found. Try adjusting your filters.
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-6 hover:shadow-lg transition flex flex-col">
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-foreground">{product.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Farmer:</span>
                  <span className="font-medium text-foreground">{product.farmerName}</span>
                </div>
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

              <Button className="w-full mt-4 bg-primary">
                Add to Cart
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
