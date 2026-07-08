import { useState } from 'react'
import { Bell, CreditCard, Globe, Lock, ShieldCheck, Store, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const settingsSections = [
  {
    title: 'Store profile',
    description: 'Keep your storefront details polished and current.',
    icon: Store,
    fields: [
      { label: 'Store name', value: 'Shopfront Admin' },
      { label: 'Tagline', value: 'Modern commerce for growing teams' },
    ],
  },
  {
    title: 'Security',
    description: 'Control access and protect your admin workspace.',
    icon: ShieldCheck,
    fields: [
      { label: 'Two-factor auth', value: 'Enabled' },
      { label: 'Recovery email', value: 'ops@shopfront.com' },
    ],
  },
]

export function SettingsPage() {
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    'Low stock alerts': true,
    'Payment updates': true,
    'Team mentions': false,
    'Regional updates': true,
    'Security notices': true,
  })

  const toggleNotification = (label: string) => {
    setNotifications((current) => ({ ...current, [label]: !current[label] }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Tune your store, security, and operations in one place.
          </p>
        </div>
        <Button>Save changes</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader>
            <CardTitle>General preferences</CardTitle>
            <CardDescription>Configure the basics that shape the daily admin experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store name</Label>
                <Input id="store-name" defaultValue="Shopfront Admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Default currency</Label>
                <Input id="currency" defaultValue="USD" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Store description</Label>
              <Textarea
                id="description"
                defaultValue="A curated storefront focused on fast catalog management and better customer experience."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Support email</Label>
                <Input id="email" defaultValue="support@shopfront.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="UTC-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick overview</CardTitle>
              <CardDescription>Snapshot of the essentials that matter most.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settingsSections.map((section) => {
                const Icon = section.icon
                return (
                  <div key={section.title} className="rounded-lg border border-border bg-secondary/40 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="font-medium">{section.title}</p>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {section.fields.map((field) => (
                        <div key={field.label} className="flex items-center justify-between gap-3">
                          <span className="text-muted-foreground">{field.label}</span>
                          <span className="font-medium">{field.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alerts & notifications</CardTitle>
              <CardDescription>Keep your team informed without overwhelming them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Low stock alerts', icon: Bell },
                { label: 'Payment updates', icon: CreditCard },
                { label: 'Team mentions', icon: Users },
                { label: 'Regional updates', icon: Globe },
                { label: 'Security notices', icon: Lock },
              ].map((item) => {
                const Icon = item.icon
                const isEnabled = notifications[item.label]

                return (
                  <div key={item.label} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-foreground">
                        <Icon className="size-4" />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleNotification(item.label)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isEnabled ? 'bg-brand-600' : 'bg-muted'
                      }`}
                      aria-pressed={isEnabled}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
