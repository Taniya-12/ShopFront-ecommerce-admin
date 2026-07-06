import { useCallback, useEffect, useState } from 'react'
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type CategoryInput,
} from '@/services/categoryService'
import type { Category } from '@/types'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchCategories()
      setCategories(data)
    } catch {
      setError('Could not load categories. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addCategory = useCallback(async (input: CategoryInput) => {
    const created = await createCategory(input)
    setCategories((prev) => [created, ...prev])
    return created
  }, [])

  const editCategory = useCallback(async (id: string, input: CategoryInput) => {
    const updated = await updateCategory(id, input)
    if (updated) {
      setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)))
    }
    return updated
  }, [])

  const removeCategory = useCallback(async (id: string) => {
    await deleteCategory(id)
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return {
    categories,
    isLoading,
    error,
    reload: load,
    addCategory,
    editCategory,
    removeCategory,
  }
}
