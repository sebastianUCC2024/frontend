// Service layer for applying data structures to AgriGo features

import { Trie, HashTable, UnionFind, SegmentTree } from '@/lib/data-structures'

export class AgriGoDataStructures {
  // Product search using Trie
  private productTrie: Trie = new Trie()

  indexProducts(products: any[]): void {
    products.forEach(product => {
      this.productTrie.insert(product.name)
      this.productTrie.insert(product.cropType)
      this.productTrie.insert(product.farmerName)
    })
  }

  searchProducts(prefix: string): string[] {
    return this.productTrie.search(prefix)
  }

  // Store lookups using Hash Table
  private storeCache: HashTable<string, any> = new HashTable()

  cacheStore(storeId: string, storeData: any): void {
    this.storeCache.set(storeId, storeData)
  }

  getStore(storeId: string): any {
    return this.storeCache.get(storeId)
  }

  // Crop grouping using Union-Find
  private cropGroups: UnionFind<string> = new UnionFind()

  groupCropsByType(crops: any[]): Map<string, string[]> {
    crops.forEach(crop => {
      this.cropGroups.makeSet(crop.id)
    })

    // Group crops of same type
    for (let i = 0; i < crops.length; i++) {
      for (let j = i + 1; j < crops.length; j++) {
        if (crops[i].cropType === crops[j].cropType) {
          this.cropGroups.union(crops[i].id, crops[j].id)
        }
      }
    }

    return this.cropGroups.getGroups()
  }

  areCropsRelated(cropId1: string, cropId2: string): boolean {
    return this.cropGroups.isConnected(cropId1, cropId2)
  }

  // Range analytics using Segment Tree
  private areaMetricsTree: SegmentTree | null = null

  setAreaMetrics(areas: number[]): void {
    if (areas.length > 0) {
      this.areaMetricsTree = new SegmentTree(areas)
    }
  }

  getTotalAreaRange(start: number, end: number): number {
    if (!this.areaMetricsTree) return 0
    return this.areaMetricsTree.query(start, end)
  }

  updateAreaMetric(index: number, newArea: number): void {
    if (this.areaMetricsTree) {
      this.areaMetricsTree.update(index, newArea)
    }
  }
}

export const agriGoDataStructures = new AgriGoDataStructures()
