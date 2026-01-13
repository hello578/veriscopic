import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ComplianceSnapshot() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Compliance Snapshot
          <Badge variant="secondary">Partial</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>✔ Legal documents accepted</p>
        <p>✔ Organisation defined</p>
        <p>✔ Responsible owner assigned</p>
        <p>⚠ No documented AI system scope</p>
      </CardContent>
    </Card>
  )
}
