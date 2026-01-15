// app/(org)/[organisationId]/dashboard/components/responsibility-map.tsx


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ResponsibilityMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Responsibility Map</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
          <strong>Organisation Owner</strong>
          <p className="text-muted-foreground">
            Primary legal and operational accountability
          </p>
        </div>
        <div>
          <strong>Admins</strong>
          <p className="text-muted-foreground">
            Delegated compliance and operational responsibility
          </p>
        </div>
        <div>
          <strong>Members</strong>
          <p className="text-muted-foreground">
            Operational use under defined policies
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
