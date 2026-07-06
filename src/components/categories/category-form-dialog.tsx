import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { CategoryForm } from '@/components/categories/category-form'
import type { Category } from '@/types'
import type { CategoryInput } from '@/services/categoryService'

interface CategoryFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'add' | 'edit'
  category?: Category | null
  onSubmit: (values: CategoryInput) => Promise<void> | void
}

export function CategoryFormDialog({
  open,
  onOpenChange,
  mode,
  category,
  onSubmit,
}: CategoryFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add category' : 'Edit category'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Create a new category to organize your products.'
              : 'Update this category’s name and description.'}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          key={category?.id ?? 'add'}
          initialValues={category ? { name: category.name, description: category.description } : undefined}
          onCancel={() => onOpenChange(false)}
          onSubmit={async (values) => {
            await onSubmit(values)
            onOpenChange(false)
          }}
          submitLabel={mode === 'add' ? 'Add category' : 'Save changes'}
        />
      </DialogContent>
    </Dialog>
  )
}
