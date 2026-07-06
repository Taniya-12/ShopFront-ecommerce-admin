import { useCallback, useEffect, useState } from 'react'
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type CreateProductInput,
} from '@/services/productService'
import type { Product } from '@/types'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch {
      setError('Could not load products. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addProduct = useCallback(async (input: CreateProductInput) => {
    const created = await createProduct(input)
    setProducts((prev) => [created, ...prev])
    return created
  }, [])

  const editProduct = useCallback(async (id: string, input: CreateProductInput) => {
    const updated = await updateProduct(id, input)
    if (updated) {
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)))
    }
    return updated
  }, [])

  const removeProduct = useCallback(async (id: string) => {
    await deleteProduct(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return { products, isLoading, error, reload: load, addProduct, editProduct, removeProduct }
}
