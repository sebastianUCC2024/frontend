'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AiInsights from './ai-insights'

interface Recommendation {
  id: string
  cropId: string
  cropName: string
  type: 'FERTILIZER' | 'PESTICIDE' | 'OPTIMIZATION'
  content: string
  createdAt: string
}

export default function RecommendationsPanel() {
  const { token } = useAuth()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRequesting, setIsRequesting] = useState(false)
  const [selectedCrop, setSelectedCrop] = useState('')
  const [selectedType, setSelectedType] = useState<'FERTILIZER' | 'PESTICIDE' | 'OPTIMIZATION'>('FERTILIZER')
  const [crops, setCrops] = useState<any[]>([])
  const [showInsights, setShowInsights] = useState(false)

  useEffect(() => {
    fetchCrops()
    fetchRecommendations()
  }, [])

  const fetchCrops = async () => {
    try {
      const response = await fetch(${process.env.NEXT_PUBLIC_API_BASE_URL}/farmers/crops', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setCrops(await response.json())
      }
    } catch (error) {
      console.error('Error fetching crops:', error)
    }
  }

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/recommendations', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setRecommendations(await response.json())
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetRecommendation = async () => {
    if (!selectedCrop) return
    setIsRequesting(true)
    try {
      const response = await fetch(${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cropId: selectedCrop, type: selectedType }),
      })
      if (response.ok) {
        await fetchRecommendations()
        setSelectedCrop('')
      }
    } catch (error) {
      console.error('Error requesting recommendation:', error)
    } finally {
      setIsRequesting(false)
    }
  }

  const getExplanation = async (cropId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/explain/${cropId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        alert(data.explanation || 'No explanation available')
      }
    } catch (error) {
      console.error('Error fetching explanation:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">AI Recommendations Engine</h3>
        <Button onClick={() => setShowInsights(!showInsights)} variant="outline">
          {showInsights ? 'Hide Insights' : 'Show Insights'}
        </Button>
      </div>

      {showInsights && <AiInsights crops={crops} />}

      {crops.length > 0 && (
        <Card className="p-6 bg-card border-2 border-primary/20">
          <h4 className="font-semibold mb-4">Request AI Recommendation</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Select Crop</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground mt-1"
                >
                  <option value="">Choose a crop...</option>
                  {crops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name} ({crop.cropType})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Recommendation Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground mt-1"
                >
                  <option value="FERTILIZER">Fertilizer Recommendations</option>
                  <option value="PESTICIDE">Pest Management</option>
                  <option value="OPTIMIZATION">Yield Optimization</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleGetRecommendation}
                  disabled={!selectedCrop || isRequesting}
                  className="w-full bg-primary"
                >
                  {isRequesting ? 'Generating...' : 'Generate Recommendation'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? (
        <Card className="p-8 text-center text-muted-foreground">Loading recommendations...</Card>
      ) : recommendations.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No recommendations yet. Request one for your crops!
        </Card>
      ) : (
        <div className="grid gap-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-lg text-foreground">{rec.cropName}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      rec.type === 'FERTILIZER' ? 'bg-blue-100 text-blue-800' :
                      rec.type === 'PESTICIDE' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.type}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed text-sm md:text-base">{rec.content}</p>
                  <div className="flex gap-2 mt-4">
                    <p className="text-xs text-muted-foreground">
                      {new Date(rec.createdAt).toLocaleDateString()} at {new Date(rec.createdAt).toLocaleTimeString()}
                    </p>
                    <button
                      onClick={() => getExplanation(rec.cropId)}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Learn More
                    </button>
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
