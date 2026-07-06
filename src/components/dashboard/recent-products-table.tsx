import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { StatusBadge } from '@/components/common/status-badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/format'
import type { Product, Category } from '@/types'

interface RecentProductsTableProps {
  products: Product[]
  categories: Category[]
}

export function RecentProductsTable({ products, categories }: RecentProductsTableProps) {
  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? '—'

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Recent products</CardTitle>
          <CardDescription>Latest additions to your catalog</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/products">View all</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="size-9 rounded-md border border-border object-cover"
                      loading="lazy"
                    />
                    <span className="font-medium text-foreground">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{categoryName(product.categoryId)}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <StatusBadge status={product.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
