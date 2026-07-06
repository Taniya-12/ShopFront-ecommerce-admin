import { Badge } from '@/components/ui/badge'
import type { ProductStatus } from '@/types'

export function StatusBadge({ status }: { status: ProductStatus }) {
  if (status === 'active') {
    return (
      <Badge variant="success" dot>
        Active
      </Badge>
    )
  }
  return (
    <Badge variant="danger" dot>
      Out of stock
    </Badge>
  )
}
