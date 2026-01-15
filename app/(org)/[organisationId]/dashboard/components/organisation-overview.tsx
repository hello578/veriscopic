
// app/(org)/[organisationId]/dashboard/components/organisation-overview.tsx

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Building2, Users } from 'lucide-react'

interface OrganisationOverviewProps {
  name: string
  memberCount: number
}

export function OrganisationOverview({
  name,
  memberCount,
}: OrganisationOverviewProps) {
  return (
    <Card className="h-full border-slate-200/60 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-slate-100 p-2.5">
            <Building2 className="h-5 w-5 text-slate-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Organisation
            </h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500">
            Name
          </p>
          <p className="text-lg font-semibold text-slate-900 break-words">
            {name}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500">
            Members
          </p>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-400" />
            <p className="text-lg font-semibold text-slate-900">
              {memberCount}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2">
          <p className="text-xs text-slate-600">
            This organisation owns and operates the AI system(s)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
