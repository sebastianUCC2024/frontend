// AI Service utilities for processing recommendations with data structures

import { Queue, Stack } from './data-structures'

export class RecommendationProcessor {
  private recommendationQueue: Queue<any> = new Queue()
  private processingHistory: Stack<any> = new Stack()

  addRecommendation(recommendation: any): void {
    this.recommendationQueue.enqueue(recommendation)
  }

  processNext(): any | undefined {
    const rec = this.recommendationQueue.dequeue()
    if (rec) {
      this.processingHistory.push(rec)
    }
    return rec
  }

  getHistory(): any[] {
    const history: any[] = []
    while (!this.processingHistory.isEmpty()) {
      const item = this.processingHistory.pop()
      if (item) history.push(item)
    }
    return history
  }

  getPendingCount(): number {
    return this.recommendationQueue.size()
  }

  // Analyze recommendations to find patterns
  analyzePatterns(recommendations: any[]): Map<string, number> {
    const patterns = new Map<string, number>()
    recommendations.forEach(rec => {
      const key = rec.type
      patterns.set(key, (patterns.get(key) || 0) + 1)
    })
    return patterns
  }
}

export const recommendationProcessor = new RecommendationProcessor()
