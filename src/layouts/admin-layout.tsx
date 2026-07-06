import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/sidebar'
import { Navbar } from '@/components/layout/navbar'
import { navItems } from '@/components/layout/nav-items'
import { cn } from '@/utils/cn'

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const currentTitle =
    navItems.find((item) => (item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)))
      ?.label ?? 'Dashboard'

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className={cn('flex min-h-screen w-full flex-1 flex-col')}>
        <Navbar onOpenMobileMenu={() => setMobileOpen(true)} pageTitle={currentTitle} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
