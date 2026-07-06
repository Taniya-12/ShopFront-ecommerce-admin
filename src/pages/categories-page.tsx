import { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { CategoryGrid } from '@/components/categories/category-grid'
import { CategoryFormDialog } from '@/components/categories/category-form-dialog'
import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog'
import { useCategories } from '@/hooks/use-categories'
import type { Category } from '@/types'

export function CategoriesPage() {
  const { categories, isLoading, addCategory, editCategory, removeCategory } = useCategories()

  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add')
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const openAddForm = () => {
    setFormMode('add')
    setActiveCategory(null)
    setFormOpen(true)
  }

  const openEditForm = (category: Category) => {
    setFormMode('edit')
    setActiveCategory(category)
    setFormOpen(true)
  }

  const openDelete = (category: Category) => {
    setActiveCategory(category)
    setDeleteOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">Categories</h2>
          <p className="text-sm text-muted-foreground">
            Organize your catalog into categories your customers can browse.
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus /> Add category
        </Button>
      </div>

      <CategoryGrid
        categories={categories}
        isLoading={isLoading}
        onEdit={openEditForm}
        onDelete={openDelete}
      />

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        category={activeCategory}
        onSubmit={async (values) => {
          if (formMode === 'add') {
            await addCategory(values)
            toast.success('Category added successfully.')
          } else if (activeCategory) {
            await editCategory(activeCategory.id, values)
            toast.success('Category updated successfully.')
          }
        }}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete this category?"
        description={`Deleting "${activeCategory?.name ?? 'this category'}" won't delete its products, but they will need to be reassigned to another category.`}
        onConfirm={async () => {
          if (activeCategory) {
            await removeCategory(activeCategory.id)
            toast.success('Category deleted.')
          }
        }}
      />
    </div>
  )
}
