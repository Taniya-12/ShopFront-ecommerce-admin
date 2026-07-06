import { NavLink } from 'react-router-dom'
import { ChevronsLeft, ShoppingBag, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { navItems } from '@/components/layout/nav-items'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'

interface SidebarProps {
  collapsed: boolean
  onToggleCollapsed: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

export function Sidebar({ collapsed, onToggleCollapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/50 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground transition-[width,transform] duration-200 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          collapsed ? 'lg:w-[76px]' : 'lg:w-64',
          'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-sm">
            <ShoppingBag className="size-5" />
          </div>
          {!collapsed && (
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">
              Shopfront Admin
            </span>
          )}
          <button
            onClick={onCloseMobile}
            className="ml-auto rounded-md p-1.5 text-sidebar-muted hover:bg-sidebar-active hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Nav */}
        <TooltipProvider delayDuration={200}>
          <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
            {navItems.map((item) => {
              const linkContent = (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      collapsed && 'lg:justify-center lg:px-0',
                      isActive
                        ? 'bg-sidebar-active text-white'
                        : 'text-sidebar-muted hover:bg-sidebar-active/60 hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-400" />
                      )}
                      <item.icon className="size-[18px] shrink-0" />
                      {!collapsed && <span className="lg:inline">{item.label}</span>}
                    </>
                  )}
                </NavLink>
              )

              if (!collapsed) return linkContent

              return (
                <Tooltip key={item.to}>
                  <TooltipTrigger asChild className="hidden lg:block">
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            })}
          </nav>
        </TooltipProvider>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden shrink-0 border-t border-sidebar-border p-3 lg:block">
          <button
            onClick={onToggleCollapsed}
            className={cn(
              'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-sidebar-muted transition-colors hover:bg-sidebar-active hover:text-white',
              collapsed && 'justify-center px-0'
            )}
          >
            <ChevronsLeft className={cn('size-[18px] transition-transform', collapsed && 'rotate-180')} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
