import { Settings } from 'lucide-react'
import { EmptyState } from '@/components/common/empty-state'

export function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your store and account preferences.</p>
      </div>

      <EmptyState
        icon={Settings}
        title="Coming soon"
        description="Store settings, team permissions, and integrations will live here once the backend is connected."
        className="py-20"
      />
    </div>
  )
}
