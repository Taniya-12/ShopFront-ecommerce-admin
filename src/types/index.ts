export type ProductStatus = 'active' | 'out-of-stock'

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  categoryId: string
  price: number
  stock: number
  status: ProductStatus
  imageUrl: string
  createdAt: string
}

export interface ProductFormValues {
  name: string
  description: string
  categoryId: string
  price: string
  stock: string
  status: ProductStatus
  imageUrl: string
}

export type SortField = 'name' | 'price' | 'stock'
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  field: SortField
  direction: SortDirection
}

export interface DashboardStats {
  totalProducts: number
  totalCategories: number
  lowStockProducts: number
  activeProducts: number
}

export interface SalesDataPoint {
  month: string
  sales: number
}
