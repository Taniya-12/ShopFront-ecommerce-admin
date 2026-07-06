import { categories as seedCategories } from '@/data/categories'
import type { Category } from '@/types'

let store: Category[] = [...seedCategories]

const DELAY = 300

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), DELAY))
}

function generateId() {
  return `cat-${Math.random().toString(36).slice(2, 10)}`
}

export async function fetchCategories(): Promise<Category[]> {
  return delay([...store])
}

export interface CategoryInput {
  name: string
  description: string
}

export async function createCategory(input: CategoryInput): Promise<Category> {
  const newCategory: Category = {
    id: generateId(),
    ...input,
    productCount: 0,
    createdAt: new Date().toISOString().slice(0, 10),
  }
  store = [newCategory, ...store]
  return delay(newCategory)
}

export async function updateCategory(
  id: string,
  input: CategoryInput
): Promise<Category | undefined> {
  let updated: Category | undefined
  store = store.map((c) => {
    if (c.id === id) {
      updated = { ...c, ...input }
      return updated
    }
    return c
  })
  return delay(updated)
}

export async function deleteCategory(id: string): Promise<{ id: string }> {
  store = store.filter((c) => c.id !== id)
  return delay({ id })
}
