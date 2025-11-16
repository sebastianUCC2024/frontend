'use client'

import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { 
  Queue, 
  Stack, 
  Tree, 
  Graph, 
  MinHeap, 
  Trie, 
  HashTable, 
  UnionFind, 
  SegmentTree 
} from '@/lib/data-structures'

export default function DataStructureDemo() {
  const [demoResults, setDemoResults] = useState<Record<string, string>>({})

  const runDemos = () => {
    const results: Record<string, string> = {}

    // Queue Demo
    const queue = new Queue<string>()
    queue.enqueue('Fertilizer Update')
    queue.enqueue('Crop Alert')
    queue.enqueue('Price Change')
    results['Queue'] = `Processing: ${queue.dequeue()}, Pending: ${queue.size()}`

    // Stack Demo
    const stack = new Stack<string>()
    stack.push('View Crops')
    stack.push('Check Prices')
    stack.push('Update Profile')
    results['Stack'] = `Last Action: ${stack.peek()}, History Size: ${stack.size()}`

    // Tree Demo
    const tree = new Tree<string>()
    tree.insert('CORN')
    tree.addChild('CORN', 'Field A')
    tree.addChild('CORN', 'Field B')
    results['Tree'] = `Crop: CORN, Fields: ${tree.getChildren('CORN').join(', ')}`

    // Graph Demo
    const graph = new Graph<string>()
    graph.addVertex('Store1')
    graph.addVertex('Store2')
    graph.addVertex('Store3')
    graph.addEdge('Store1', 'Store2')
    graph.addEdge('Store2', 'Store3')
    const connected = graph.bfs('Store1')
    results['Graph'] = `Connected Stores: ${connected.join(' -> ')}`

    // MinHeap Demo (Price Comparison)
    const heap = new MinHeap<{ store: string; price: number }>((a, b) => a.price - b.price)
    heap.push({ store: 'Store1', price: 25 })
    heap.push({ store: 'Store2', price: 18 })
    heap.push({ store: 'Store3', price: 22 })
    const cheapest = heap.peek()
    results['MinHeap'] = `Cheapest: ${cheapest?.store} at $${cheapest?.price}`

    // Trie Demo
    const trie = new Trie()
    trie.insert('Fertilizer')
    trie.insert('Fungicide')
    trie.insert('Corn')
    const suggestions = trie.search('fert')
    results['Trie'] = `Suggestions for "fert": ${suggestions.join(', ')}`

    // Hash Table Demo
    const hashTable = new HashTable<string, number>()
    hashTable.set('price_corn', 150)
    hashTable.set('price_wheat', 120)
    hashTable.set('price_rice', 200)
    results['HashTable'] = `Stored: ${hashTable.size()} prices, Corn: $${hashTable.get('price_corn')}`

    // Union-Find Demo
    const unionFind = new UnionFind<string>()
    unionFind.makeSet('Crop1')
    unionFind.makeSet('Crop2')
    unionFind.makeSet('Crop3')
    unionFind.union('Crop1', 'Crop2')
    results['UnionFind'] = `Crop1 & Crop2 Related: ${unionFind.isConnected('Crop1', 'Crop2')}`

    // Segment Tree Demo
    const segTree = new SegmentTree([10, 5, 15, 8, 12])
    results['SegmentTree'] = `Total Area [0-2]: ${segTree.query(0, 2)} hectares`

    setDemoResults(results)
  }

  return (
    <div className="space-y-4">
      <button
        onClick={runDemos}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Run Data Structure Demos
      </button>

      {Object.entries(demoResults).length > 0 && (
        <div className="grid gap-2">
          {Object.entries(demoResults).map(([name, result]) => (
            <Card key={name} className="p-4">
              <h5 className="font-semibold text-foreground">{name}</h5>
              <p className="text-sm text-muted-foreground mt-1">{result}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
