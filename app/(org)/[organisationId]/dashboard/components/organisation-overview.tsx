
// app/(org)/[organisationId]/dashboard/components/organisation-overview.tsx


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OrganisationOverview({
  name,
  memberCount,
}: {
  name: string
  memberCount: number
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organisation</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Members:</strong> {memberCount}</p>
        <p className="text-muted-foreground">
          This organisation owns and operates the AI system(s)
        </p>
      </CardContent>
    </Card>
  )
}
