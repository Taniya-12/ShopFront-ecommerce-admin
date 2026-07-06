import { Search, ArrowUpDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import type { Category, SortConfig, SortField } from '@/types'

interface ProductFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  categoryFilter: string
  onCategoryFilterChange: (value: string) => void
  categories: Category[]
  sort: SortConfig
  onSortChange: (sort: SortConfig) => void
}

const sortOptions: { value: string; label: string; field: SortField; direction: 'asc' | 'desc' }[] = [
  { value: 'name-asc', label: 'Name (A–Z)', field: 'name', direction: 'asc' },
  { value: 'name-desc', label: 'Name (Z–A)', field: 'name', direction: 'desc' },
  { value: 'price-asc', label: 'Price (low to high)', field: 'price', direction: 'asc' },
  { value: 'price-desc', label: 'Price (high to low)', field: 'price', direction: 'desc' },
  { value: 'stock-asc', label: 'Stock (low to high)', field: 'stock', direction: 'asc' },
  { value: 'stock-desc', label: 'Stock (high to low)', field: 'stock', direction: 'desc' },
]

export function ProductFilters({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
  sort,
  onSortChange,
}: ProductFiltersProps) {
  const currentSortValue = `${sort.field}-${sort.direction}`

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by product name…"
          className="pl-9"
        />
      </div>

      <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
        <SelectTrigger className="sm:w-48">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentSortValue}
        onValueChange={(value) => {
          const option = sortOptions.find((o) => o.value === value)
          if (option) onSortChange({ field: option.field, direction: option.direction })
        }}
      >
        <SelectTrigger className="sm:w-52">
          <ArrowUpDown className="mr-1 size-3.5 text-muted-foreground" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
