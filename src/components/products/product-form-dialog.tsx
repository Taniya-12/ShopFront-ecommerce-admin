import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ProductForm } from '@/components/products/product-form'
import type { Category, Product, ProductFormValues } from '@/types'
import type { CreateProductInput } from '@/services/productService'

interface ProductFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'add' | 'edit'
  product?: Product | null
  categories: Category[]
  onSubmit: (values: CreateProductInput) => Promise<void> | void
}

export function ProductFormDialog({
  open,
  onOpenChange,
  mode,
  product,
  categories,
  onSubmit,
}: ProductFormDialogProps) {
  const initialValues: ProductFormValues | undefined = product
    ? {
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        price: String(product.price),
        stock: String(product.stock),
        status: product.status,
        imageUrl: product.imageUrl,
      }
    : undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add product' : 'Edit product'}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Fill in the details below to add a new product to your catalog.'
              : 'Update the product details, then save your changes.'}
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          key={product?.id ?? 'add'}
          categories={categories}
          initialValues={initialValues}
          onCancel={() => onOpenChange(false)}
          onSubmit={async (values) => {
            await onSubmit(values)
            onOpenChange(false)
          }}
          submitLabel={mode === 'add' ? 'Add product' : 'Save changes'}
        />
      </DialogContent>
    </Dialog>
  )
}
