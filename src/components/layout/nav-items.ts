import { LayoutDashboard, Package, Tags, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Products', to: '/products', icon: Package },
  { label: 'Categories', to: '/categories', icon: Tags },
  { label: 'Settings', to: '/settings', icon: Settings },
]
