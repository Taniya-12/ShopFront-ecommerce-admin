import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pagination } from '@/components/ui/pagination'
import { ProductFilters } from '@/components/products/product-filters'
import { ProductTable } from '@/components/products/product-table'
import { ProductFormDialog } from '@/components/products/product-form-dialog'
import { ViewProductDialog } from '@/components/products/view-product-dialog'
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog'
import { useProducts } from '@/hooks/use-products'
import { useCategories } from '@/hooks/use-categories'
import { useDebounce } from '@/hooks/use-debounce'
import type { Product, SortConfig } from '@/types'

const PAGE_SIZE = 8

export function ProductsPage() {
  const { products, isLoading, addProduct, editProduct, removeProduct } = useProducts()
  const { categories } = useCategories()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 250)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sort, setSort] = useState<SortConfig>({ field: 'name', direction: 'asc' })
  const [page, setPage] = useState(1)

  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add')
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = products

    if (debouncedSearch.trim()) {
      const query = debouncedSearch.trim().toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(query))
    }

    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.categoryId === categoryFilter)
    }

    const sorted = [...result].sort((a, b) => {
      const dir = sort.direction === 'asc' ? 1 : -1
      if (sort.field === 'name') return a.name.localeCompare(b.name) * dir
      return (a[sort.field] - b[sort.field]) * dir
    })

    return sorted
  }, [products, debouncedSearch, categoryFilter, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const resetPageOnFilterChange = () => setPage(1)

  const openAddForm = () => {
    setFormMode('add')
    setActiveProduct(null)
    setFormOpen(true)
  }

  const openEditForm = (product: Product) => {
    setFormMode('edit')
    setActiveProduct(product)
    setFormOpen(true)
  }

  const openView = (product: Product) => {
    setActiveProduct(product)
    setViewOpen(true)
  }

  const openDelete = (product: Product) => {
    setActiveProduct(product)
    setDeleteOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">Products</h2>
          <p className="text-sm text-muted-foreground">
            Manage your catalog — search, filter, and edit products.
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus /> Add product
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-4 sm:p-5">
          <ProductFilters
            search={search}
            onSearchChange={(v) => {
              setSearch(v)
              resetPageOnFilterChange()
            }}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={(v) => {
              setCategoryFilter(v)
              resetPageOnFilterChange()
            }}
            categories={categories}
            sort={sort}
            onSortChange={setSort}
          />

          <div className="-mx-4 -mb-4 sm:-mx-5 sm:-mb-5">
            <ProductTable
              products={paginated}
              categories={categories}
              isLoading={isLoading}
              onView={openView}
              onEdit={openEditForm}
              onDelete={openDelete}
            />
          </div>

          {!isLoading && filtered.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} products
              </p>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </CardContent>
      </Card>

      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        product={activeProduct}
        categories={categories}
        onSubmit={async (values) => {
          if (formMode === 'add') {
            await addProduct(values)
            toast.success('Product added successfully.')
          } else if (activeProduct) {
            await editProduct(activeProduct.id, values)
            toast.success('Product updated successfully.')
          }
        }}
      />

      <ViewProductDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        product={activeProduct}
        categories={categories}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete this product?"
        description={`This will permanently remove "${activeProduct?.name ?? 'this product'}" from your catalog. This action can't be undone.`}
        onConfirm={async () => {
          if (activeProduct) {
            await removeProduct(activeProduct.id)
            toast.success('Product deleted.')
          }
        }}
      />
    </div>
  )
}
