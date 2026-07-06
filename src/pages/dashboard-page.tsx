import { useMemo } from 'react'
import { Package, Tags, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { StatCard } from '@/components/dashboard/stat-card'
import { SalesChart } from '@/components/dashboard/sales-chart'
import { RecentProductsTable } from '@/components/dashboard/recent-products-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useProducts } from '@/hooks/use-products'
import { useCategories } from '@/hooks/use-categories'
import { salesData } from '@/data/sales'
import { formatNumber } from '@/utils/format'

export function DashboardPage() {
  const { products, isLoading: productsLoading } = useProducts()
  const { categories, isLoading: categoriesLoading } = useCategories()

  const stats = useMemo(() => {
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length
    const active = products.filter((p) => p.status === 'active').length
    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      lowStock,
      active,
    }
  }, [products, categories])

  const recentProducts = useMemo(
    () =>
      [...products]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [products]
  )

  const isLoading = productsLoading || categoriesLoading

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome section */}
      <div className="rounded-xl bg-gradient-to-br from-ink-800 via-ink-800 to-brand-800 px-6 py-7 text-white sm:px-8">
        <p className="text-sm font-medium text-brand-200">Good to see you</p>
        <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome back, Alex
        </h2>
        <p className="mt-2 max-w-xl text-sm text-white/70">
          Here's what's happening across your store today. Your catalog and recent sales are
          summarized below.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[110px] rounded-lg" />)
        ) : (
          <>
            <StatCard
              label="Total products"
              value={formatNumber(stats.totalProducts)}
              icon={Package}
              accent="brand"
              trend={{ value: '4.2%', positive: true }}
            />
            <StatCard
              label="Total categories"
              value={formatNumber(stats.totalCategories)}
              icon={Tags}
              accent="slate"
            />
            <StatCard
              label="Low stock products"
              value={formatNumber(stats.lowStock)}
              icon={AlertTriangle}
              accent="amber"
              trend={{ value: '2 new', positive: false }}
            />
            <StatCard
              label="Active products"
              value={formatNumber(stats.active)}
              icon={CheckCircle2}
              accent="brand"
              trend={{ value: '1.8%', positive: true }}
            />
          </>
        )}
      </div>

      {/* Chart + Recent products */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <SalesChart data={salesData} />
        </div>
        <div className="xl:col-span-3">
          {isLoading ? (
            <Skeleton className="h-[360px] rounded-lg" />
          ) : (
            <RecentProductsTable products={recentProducts} categories={categories} />
          )}
        </div>
      </div>
    </div>
  )
}
