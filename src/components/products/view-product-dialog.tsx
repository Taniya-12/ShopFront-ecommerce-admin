import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { StatusBadge } from '@/components/common/status-badge'
import { formatCurrency, formatDate } from '@/utils/format'
import type { Category, Product } from '@/types'

interface ViewProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
  categories: Category[]
}

export function ViewProductDialog({ open, onOpenChange, product, categories }: ViewProductDialogProps) {
  if (!product) return null
  const categoryName = categories.find((c) => c.id === product.categoryId)?.name ?? '—'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product details</DialogTitle>
          <DialogDescription>Read-only overview of this product.</DialogDescription>
        </DialogHeader>

        <div className="flex gap-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="size-24 shrink-0 rounded-lg border border-border object-cover"
          />
          <div className="min-w-0">
            <h3 className="font-display text-base font-semibold">{product.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{product.description}</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border border-border bg-secondary/30 p-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Category</dt>
            <dd className="mt-0.5 font-medium">{categoryName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Status</dt>
            <dd className="mt-0.5"><StatusBadge status={product.status} /></dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Price</dt>
            <dd className="mt-0.5 font-medium">{formatCurrency(product.price)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Stock</dt>
            <dd className="mt-0.5 font-medium">{product.stock} units</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Added on</dt>
            <dd className="mt-0.5 font-medium">{formatDate(product.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Product ID</dt>
            <dd className="mt-0.5 font-mono text-xs">{product.id}</dd>
          </div>
        </dl>
      </DialogContent>
    </Dialog>
  )
}
