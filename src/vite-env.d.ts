/// <reference types="vite/client" />

// Minimal compatibility shim for lucide-react typings in this workspace.
declare module 'lucide-react' {
  import * as React from 'react'

  export type LucideProps = React.SVGProps<SVGSVGElement> & {
    size?: number | string
    strokeWidth?: number | string
  }

  export type LucideIcon = React.ComponentType<LucideProps>

  export const Bot: LucideIcon
  export const Send: LucideIcon
  export const Sparkles: LucideIcon
  export const X: LucideIcon
  export const Bell: LucideIcon
  export const CreditCard: LucideIcon
  export const Globe: LucideIcon
  export const Lock: LucideIcon
  export const ShieldCheck: LucideIcon
  export const Store: LucideIcon
  export const Users: LucideIcon
  export const LayoutDashboard: LucideIcon
  export const Package: LucideIcon
  export const Tags: LucideIcon
  export const Settings: LucideIcon
  export const ChevronsLeft: LucideIcon
  export const ShoppingBag: LucideIcon
  export const Menu: LucideIcon
  export const Search: LucideIcon
  export const Plus: LucideIcon
  export const AlertTriangle: LucideIcon
  export const CheckCircle2: LucideIcon
  export const Compass: LucideIcon
  export const ArrowUpDown: LucideIcon
  export const MoreVertical: LucideIcon
  export const Eye: LucideIcon
  export const Pencil: LucideIcon
  export const Trash2: LucideIcon
  export const PackageSearch: LucideIcon
  export const Check: LucideIcon
  export const ChevronRight: LucideIcon
  export const Circle: LucideIcon
  export const ChevronLeft: LucideIcon
  export const ChevronRight: LucideIcon
  export const MoreHorizontal: LucideIcon
  export const ChevronDown: LucideIcon
  export const ChevronUp: LucideIcon
}
