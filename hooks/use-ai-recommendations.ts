'use client'

import { useState, useCallback } from 'react'

interface RecommendationResponse {
  id: string
  content: string
  type: 'FERTILIZER' | 'PESTICIDE' | 'OPTIMIZATION'
  timestamp: string
}

export function useAiRecommendations(token: string | null) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRecommendation = useCallback(
    async (cropId: string, type: 'FERTILIZER' | 'PESTICIDE' | 'OPTIMIZATION'): Promise<RecommendationResponse | null> => {
      if (!token) {
        setError('Not authenticated')
        return null
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('http://localhost:8080/ai/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cropId, type }),
        })

        if (!response.ok) {
          throw new Error('Failed to get recommendation')
        }

        const data = await response.json()
        return data
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [token]
  )

  return { getRecommendation, isLoading, error }
}
