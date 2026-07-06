import { products as seedProducts } from '@/data/products'
import type { Product, ProductStatus } from '@/types'

// In-memory store standing in for a real API. Swap these functions for
// fetch() calls against the Spring Boot backend when it's ready — the
// call signatures below are written to match a typical REST resource.
let store: Product[] = [...seedProducts]

const DELAY = 350

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), DELAY))
}

function generateId() {
  return `prod-${Math.random().toString(36).slice(2, 10)}`
}

export async function fetchProducts(): Promise<Product[]> {
  return delay([...store])
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  return delay(store.find((p) => p.id === id))
}

export interface CreateProductInput {
  name: string
  description: string
  categoryId: string
  price: number
  stock: number
  status: ProductStatus
  imageUrl: string
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const newProduct: Product = {
    id: generateId(),
    ...input,
    createdAt: new Date().toISOString().slice(0, 10),
  }
  store = [newProduct, ...store]
  return delay(newProduct)
}

export async function updateProduct(
  id: string,
  input: CreateProductInput
): Promise<Product | undefined> {
  let updated: Product | undefined
  store = store.map((p) => {
    if (p.id === id) {
      updated = { ...p, ...input }
      return updated
    }
    return p
  })
  return delay(updated)
}

export async function deleteProduct(id: string): Promise<{ id: string }> {
  store = store.filter((p) => p.id !== id)
  return delay({ id })
}
