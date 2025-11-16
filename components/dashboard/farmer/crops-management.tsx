'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Crop {
  id: string
  name: string
  plantedDate: string
  area: number
  cropType: string
  status: 'ACTIVE' | 'HARVESTED' | 'PLANNING'
}

export default function CropsManagement() {
  const { token } = useAuth()
  const { t } = useLanguage()
  const [crops, setCrops] = useState<Crop[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    cropType: 'CORN',
  })

  useEffect(() => {
    fetchCrops()
  }, [])

  const fetchCrops = async () => {
    try {
      const response = await fetch('http://localhost:8080/farmers/crops', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setCrops(data || [])
      }
    } catch (error) {
      console.error('Error fetching crops:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCrop = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/farmers/crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          area: parseFloat(formData.area),
          cropType: formData.cropType,
        }),
      })

      if (response.ok) {
        setFormData({ name: '', area: '', cropType: 'CORN' })
        setShowForm(false)
        await fetchCrops()
      }
    } catch (error) {
      console.error('Error creating crop:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ACTIVE':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
      case 'HARVESTED':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
      case 'PLANNING':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground dark:text-foreground">{t('farmer.crops')}</h3>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary dark:bg-primary">
          {showForm ? t('farmer.cancel') : `+ ${t('farmer.addCrop')}`}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 bg-card dark:bg-card border dark:border-border">
          <form onSubmit={handleCreateCrop} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground dark:text-foreground">{t('farmer.cropName')}</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('farmer.cropName')}
                required
                className="dark:bg-background dark:text-foreground dark:border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground dark:text-foreground">{t('farmer.area')}</label>
                <Input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="10.5"
                  required
                  className="dark:bg-background dark:text-foreground dark:border-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground dark:text-foreground">{t('farmer.status')}</label>
                <select
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground dark:bg-background dark:text-foreground dark:border-border"
                >
                  <option value="CORN">Corn</option>
                  <option value="WHEAT">Wheat</option>
                  <option value="RICE">Rice</option>
                  <option value="SOYBEAN">Soybean</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary dark:bg-primary">
              {t('farmer.create')}
            </Button>
          </form>
        </Card>
      )}

      {isLoading ? (
        <Card className="p-8 text-center text-muted-foreground dark:text-muted-foreground dark:bg-card">
          {t('common.loading')}
        </Card>
      ) : crops.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground dark:text-muted-foreground dark:bg-card">
          {t('farmer.noCrops')}
        </Card>
      ) : (
        <div className="grid gap-4">
          {crops.map((crop) => (
            <Card key={crop.id} className="p-6 hover:shadow-lg transition dark:bg-card dark:border-border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-foreground dark:text-foreground">{crop.name}</h4>
                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm text-muted-foreground dark:text-muted-foreground">
                    <div>
                      <span className="font-medium text-foreground dark:text-foreground">{crop.area}</span> {t('farmer.area')}
                    </div>
                    <div>
                      <span className="font-medium text-foreground dark:text-foreground">{crop.cropType}</span>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(crop.status)}`}>
                        {crop.status}
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
