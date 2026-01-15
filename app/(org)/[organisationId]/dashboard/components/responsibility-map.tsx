// app/(org)/[organisationId]/dashboard/components/responsibility-map.tsx
// app/(org)/[organisationId]/dashboard/components/responsibility-map.tsx

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Shield, UserCog, Users } from 'lucide-react'

export function ResponsibilityMap() {
  const roles = [
    {
      title: 'Organisation Owner',
      icon: Shield,
      description: 'Primary legal and operational accountability',
      accent: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Admins',
      icon: UserCog,
      description: 'Delegated compliance and operational responsibility',
      accent: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Members',
      icon: Users,
      description: 'Operational use under defined policies',
      accent: 'text-muted-foreground',
      bg: 'bg-muted/40',
    },
  ]

  return (
    <Card className="h-full bg-background shadow-sm ring-1 ring-border">
      <CardHeader className="pb-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold tracking-tight">
            Responsibility Map
          </h3>
          <p className="text-xs text-muted-foreground">
            Role-based accountability structure
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {roles.map(({ title, icon: Icon, description, accent, bg }) => (
          <div
            key={title}
            className={`rounded-lg border ${bg} p-4`}
          >
            <div className="flex gap-3">
              <div className={`rounded-lg bg-background p-2 ${accent}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
