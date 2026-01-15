// app/(org)/[organisationId]/dashboard/components/evidence-log.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EvidenceLog({
  events,
}: {
  events: { accepted_at: string }[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evidence Log</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2 text-muted-foreground">
        {events.map((e, i) => (
          <p key={i}>
            {new Date(e.accepted_at).toLocaleDateString()} — Terms accepted
          </p>
        ))}
      </CardContent>
    </Card>
  )
}
