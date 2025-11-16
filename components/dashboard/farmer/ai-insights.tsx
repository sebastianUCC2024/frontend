'use client'

import { Card } from '@/components/ui/card'
import { Graph, Queue, Tree } from '@/lib/data-structures'
import { useState, useMemo } from 'react'

interface Crop {
  id: string
  name: string
  cropType: string
  status: string
  area: number
}

export default function AiInsights({ crops }: { crops: Crop[] }) {
  // Use Graph data structure to analyze crop relationships
  const cropGraph = useMemo(() => {
    const graph = new Graph<string>()
    crops.forEach(crop => {
      graph.addVertex(crop.id)
      // Connect crops of same type
      crops.forEach(other => {
        if (crop.cropType === other.cropType && crop.id !== other.id) {
          graph.addEdge(crop.id, other.id, false)
        }
      })
    })
    return graph
  }, [crops])

  // Use Tree structure to show crop hierarchy
  const cropTree = useMemo(() => {
    const tree = new Tree<string>()
    if (crops.length > 0) {
      tree.insert(crops[0].cropType)
      crops.forEach(crop => {
        tree.addChild(crop.cropType, crop.name)
      })
    }
    return tree
  }, [crops])

  // Use Queue for processing recommendations in order
  const recommendationQueue = useMemo(() => {
    const queue = new Queue<string>()
    crops.forEach(crop => {
      if (crop.status === 'ACTIVE') {
        queue.enqueue(crop.name)
      }
    })
    return queue
  }, [crops])

  const cropsByType = crops.reduce((acc, crop) => {
    if (!acc[crop.cropType]) {
      acc[crop.cropType] = []
    }
    acc[crop.cropType].push(crop)
    return acc
  }, {} as Record<string, Crop[]>)

  const totalArea = crops.reduce((sum, crop) => sum + crop.area, 0)
  const activeCrops = crops.filter(c => c.status === 'ACTIVE').length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-muted-foreground text-sm">Total Crops</p>
          <p className="text-3xl font-bold text-primary mt-2">{crops.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-muted-foreground text-sm">Active Crops</p>
          <p className="text-3xl font-bold text-secondary mt-2">{activeCrops}</p>
        </Card>
        <Card className="p-4">
          <p className="text-muted-foreground text-sm">Total Area</p>
          <p className="text-3xl font-bold text-accent mt-2">{totalArea.toFixed(1)} ha</p>
        </Card>
      </div>

      <Card className="p-4">
        <h5 className="font-semibold text-foreground mb-3">Crop Distribution</h5>
        <div className="space-y-2 text-sm">
          {Object.entries(cropsByType).map(([type, typeCrops]) => (
            <div key={type} className="flex justify-between items-center">
              <span className="text-muted-foreground">{type}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{typeCrops.length}</span>
                <div className="bg-primary/20 w-16 h-2 rounded-full">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${(typeCrops.length / crops.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h5 className="font-semibold text-foreground mb-3">Next Crops for AI Analysis (Queue)</h5>
        <p className="text-xs text-muted-foreground">
          {recommendationQueue.size()} crops queued for analysis
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {Array.from({ length: Math.min(recommendationQueue.size(), 5) }, (_, i) => (
            <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
              {i + 1}
            </span>
          ))}
        </div>
      </Card>
    </div>
  )
}
