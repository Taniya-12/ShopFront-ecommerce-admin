import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/card'

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  accent?: 'brand' | 'amber' | 'red' | 'slate'
}

const accentStyles: Record<NonNullable<StatCardProps['accent']>, string> = {
  brand: 'bg-brand-50 text-brand-600',
  amber: 'bg-[var(--color-warning-bg)] text-[var(--color-warning)]',
  red: 'bg-[var(--color-danger-bg)] text-[var(--color-danger)]',
  slate: 'bg-secondary text-foreground',
}

export function StatCard({ label, value, icon: Icon, trend, accent = 'brand' }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', accentStyles[accent])}>
          <Icon className="size-5" />
        </div>
      </div>
      {trend && (
        <p
          className={cn(
            'mt-3 text-xs font-medium',
            trend.positive ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'
          )}
        >
          {trend.positive ? '↑' : '↓'} {trend.value}
          <span className="ml-1 font-normal text-muted-foreground">vs last month</span>
        </p>
      )}
    </Card>
  )
}
