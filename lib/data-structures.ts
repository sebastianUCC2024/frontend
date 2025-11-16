// Advanced Data Structures for AgriGo

// Queue implementation for price updates
export class Queue<T> {
  private items: T[] = []

  enqueue(item: T) {
    this.items.push(item)
  }

  dequeue(): T | undefined {
    return this.items.shift()
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  peek(): T | undefined {
    return this.items[0]
  }
}

// Stack implementation for navigation/undo history
export class Stack<T> {
  private items: T[] = []

  push(item: T) {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }
}

// Tree Node for hierarchical crop data
export interface TreeNode<T> {
  value: T
  children: TreeNode<T>[]
}

export class Tree<T> {
  private root: TreeNode<T> | null = null

  insert(value: T): void {
    if (this.root === null) {
      this.root = { value, children: [] }
    }
  }

  addChild(parentValue: T, childValue: T): void {
    const parent = this.findNode(this.root, parentValue)
    if (parent) {
      parent.children.push({ value: childValue, children: [] })
    }
  }

  private findNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null
    if (node.value === value) return node
    for (const child of node.children) {
      const result = this.findNode(child, value)
      if (result) return result
    }
    return null
  }

  getChildren(parentValue: T): T[] {
    const parent = this.findNode(this.root, parentValue)
    return parent ? parent.children.map(child => child.value) : []
  }
}

// Graph for price comparisons between stores
export class Graph<T> {
  private adjacencyList: Map<T, T[]> = new Map()

  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, [])
    }
  }

  addEdge(vertex1: T, vertex2: T, bidirectional = true): void {
    this.addVertex(vertex1)
    this.addVertex(vertex2)
    const adj1 = this.adjacencyList.get(vertex1)
    if (adj1) adj1.push(vertex2)
    if (bidirectional) {
      const adj2 = this.adjacencyList.get(vertex2)
      if (adj2) adj2.push(vertex1)
    }
  }

  getNeighbors(vertex: T): T[] {
    return this.adjacencyList.get(vertex) || []
  }

  // BFS for finding connected stores
  bfs(start: T): T[] {
    const visited = new Set<T>()
    const queue = new Queue<T>()
    queue.enqueue(start)
    visited.add(start)

    const result: T[] = []
    while (!queue.isEmpty()) {
      const vertex = queue.dequeue()
      if (vertex !== undefined) {
        result.push(vertex)
        for (const neighbor of this.getNeighbors(vertex)) {
          if (!visited.has(neighbor)) {
            queue.enqueue(neighbor)
            visited.add(neighbor)
          }
        }
      }
    }
    return result
  }

  // DFS for price comparison chains
  dfs(start: T): T[] {
    const visited = new Set<T>()
    const result: T[] = []

    const dfsHelper = (vertex: T) => {
      visited.add(vertex)
      result.push(vertex)
      for (const neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor)
        }
      }
    }

    dfsHelper(start)
    return result
  }
}

// Min Heap for finding best prices
export class MinHeap<T> {
  private heap: T[] = []
  private compareFn: (a: T, b: T) => number

  constructor(compareFn: (a: T, b: T) => number) {
    this.compareFn = compareFn
  }

  push(item: T): void {
    this.heap.push(item)
    this.bubbleUp(this.heap.length - 1)
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined
    if (this.heap.length === 1) return this.heap.pop()
    const root = this.heap[0]
    this.heap[0] = this.heap.pop()!
    this.bubbleDown(0)
    return root
  }

  peek(): T | undefined {
    return this.heap[0]
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      if (this.compareFn(this.heap[index], this.heap[parentIndex]) < 0) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]]
        index = parentIndex
      } else {
        break
      }
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      let smallest = index
      const leftChild = 2 * index + 1
      const rightChild = 2 * index + 2

      if (
        leftChild < this.heap.length &&
        this.compareFn(this.heap[leftChild], this.heap[smallest]) < 0
      ) {
        smallest = leftChild
      }
      if (
        rightChild < this.heap.length &&
        this.compareFn(this.heap[rightChild], this.heap[smallest]) < 0
      ) {
        smallest = rightChild
      }

      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]]
        index = smallest
      } else {
        break
      }
    }
  }

  isEmpty(): boolean {
    return this.heap.length === 0
  }

  size(): number {
    return this.heap.length
  }
}

// Trie for fast product search optimization
export class Trie {
  private root: TrieNode = {}

  insert(word: string): void {
    let node = this.root
    for (const char of word.toLowerCase()) {
      if (!node[char]) {
        node[char] = {}
      }
      node = node[char]
    }
    node.isEndOfWord = true
  }

  search(prefix: string): string[] {
    let node = this.root
    for (const char of prefix.toLowerCase()) {
      if (!node[char]) {
        return []
      }
      node = node[char]
    }

    const results: string[] = []
    this.dfs(node, prefix, results)
    return results
  }

  private dfs(node: any, prefix: string, results: string[]): void {
    if (node.isEndOfWord) {
      results.push(prefix)
    }

    for (const char in node) {
      if (char !== 'isEndOfWord' && node[char]) {
        this.dfs(node[char], prefix + char, results)
      }
    }
  }
}

interface TrieNode {
  [key: string]: any
  isEndOfWord?: boolean
}

// Hash Table for fast lookups
export class HashTable<K, V> {
  private table: Map<K, V> = new Map()

  set(key: K, value: V): void {
    this.table.set(key, value)
  }

  get(key: K): V | undefined {
    return this.table.get(key)
  }

  has(key: K): boolean {
    return this.table.has(key)
  }

  delete(key: K): boolean {
    return this.table.delete(key)
  }

  clear(): void {
    this.table.clear()
  }

  entries(): Array<[K, V]> {
    return Array.from(this.table.entries())
  }

  keys(): K[] {
    return Array.from(this.table.keys())
  }

  values(): V[] {
    return Array.from(this.table.values())
  }

  size(): number {
    return this.table.size
  }
}

// Union-Find for crop grouping and price comparison chains
export class UnionFind<T> {
  private parent: Map<T, T> = new Map()
  private rank: Map<T, number> = new Map()

  makeSet(element: T): void {
    if (!this.parent.has(element)) {
      this.parent.set(element, element)
      this.rank.set(element, 0)
    }
  }

  find(element: T): T {
    if (!this.parent.has(element)) {
      this.makeSet(element)
    }

    const parent = this.parent.get(element)!
    if (parent !== element) {
      this.parent.set(element, this.find(parent))
    }
    return this.parent.get(element)!
  }

  union(element1: T, element2: T): void {
    const root1 = this.find(element1)
    const root2 = this.find(element2)

    if (root1 === root2) return

    const rank1 = this.rank.get(root1) || 0
    const rank2 = this.rank.get(root2) || 0

    if (rank1 < rank2) {
      this.parent.set(root1, root2)
    } else if (rank1 > rank2) {
      this.parent.set(root2, root1)
    } else {
      this.parent.set(root2, root1)
      this.rank.set(root1, (rank1 || 0) + 1)
    }
  }

  isConnected(element1: T, element2: T): boolean {
    return this.find(element1) === this.find(element2)
  }

  getGroups(): Map<T, T[]> {
    const groups = new Map<T, T[]>()
    for (const element of this.parent.keys()) {
      const root = this.find(element)
      if (!groups.has(root)) {
        groups.set(root, [])
      }
      groups.get(root)!.push(element)
    }
    return groups
  }
}

// Segment Tree for range queries on crop metrics
export class SegmentTree {
  private tree: number[]
  private n: number

  constructor(arr: number[]) {
    this.n = arr.length
    this.tree = new Array(4 * this.n).fill(0)
    if (this.n > 0) {
      this.build(arr, 0, 0, this.n - 1)
    }
  }

  private build(arr: number[], node: number, start: number, end: number): void {
    if (start === end) {
      this.tree[node] = arr[start]
    } else {
      const mid = Math.floor((start + end) / 2)
      this.build(arr, 2 * node + 1, start, mid)
      this.build(arr, 2 * node + 2, mid + 1, end)
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2]
    }
  }

  query(left: number, right: number): number {
    return this.queryHelper(0, 0, this.n - 1, left, right)
  }

  private queryHelper(node: number, start: number, end: number, left: number, right: number): number {
    if (right < start || end < left) {
      return 0
    }

    if (left <= start && end <= right) {
      return this.tree[node]
    }

    const mid = Math.floor((start + end) / 2)
    return (
      this.queryHelper(2 * node + 1, start, mid, left, right) +
      this.queryHelper(2 * node + 2, mid + 1, end, left, right)
    )
  }

  update(index: number, value: number): void {
    this.updateHelper(0, 0, this.n - 1, index, value)
  }

  private updateHelper(node: number, start: number, end: number, index: number, value: number): void {
    if (start === end) {
      this.tree[node] = value
    } else {
      const mid = Math.floor((start + end) / 2)
      if (index <= mid) {
        this.updateHelper(2 * node + 1, start, mid, index, value)
      } else {
        this.updateHelper(2 * node + 2, mid + 1, end, index, value)
      }
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2]
    }
  }
}
