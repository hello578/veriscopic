// app/(org)/[organisationId]/dashboard/page.tsx

import { redirect } from "next/navigation"
import { requireMember, hasRole } from "@/lib/rbac/guards"
import { supabaseServerRead } from "@/lib/supabase/server-read"
import { DashboardHeader } from "./components/dashboard-header"
import { OrganisationOverview } from "./components/organisation-overview"
import { ComplianceCompletenessCard } from "./components/compliance-completeness-card"
import { ResponsibilityMap } from "./components/responsibility-map"
import { LegalStatusTable } from "./components/legal-status-table"
import { EvidenceLog } from "./components/evidence-log"
import { AcceptDocumentsCTA } from "./components/accept-documents-cta"
import { EvidencePackCard } from "./components/evidence-pack-card"
import { DriftStatusCard } from "./components/drift-status-card"
import { FeatureToggle } from "@/components/compliance/feature-toggle"

import { getCurrentPlatformDocuments } from "@/lib/legal/read-documents"
import {
  getOrganisationAcceptanceEvents,
  type AcceptanceEvent,
} from "@/lib/legal/read-acceptance"
import { getLatestDriftStatus } from "@/lib/legal/drift/get-latest-drift"
import { computeCompleteness } from "@/lib/legal/completeness"

export const dynamic = "force-dynamic"
export const revalidate = 0

function formatDate(iso?: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

type PageProps = {
  params: Promise<{ organisationId: string }>
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-7">
      <div className="mb-5 border-b border-slate-200/70 pb-4">
        <h2 className="text-sm font-semibold tracking-[0.16em] text-slate-500 uppercase">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">
            {description}
          </p>
        ) : null}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

export default async function OrganisationDashboardPage({ params }: PageProps) {
  const { organisationId } = await params

  const result = await requireMember(organisationId)
  if (!result.ok) {
    redirect(result.reason === "unauthenticated" ? "/auth/login" : "/")
  }

  const { ctx } = result
  if (!ctx.org) redirect("/")

  const supabase = await supabaseServerRead()

  const [
    { data: orgRow },
    currentDocs,
    acceptanceEvents,
    { count: aiSystemsCount },
    driftStatus,
  ] = await Promise.all([
    supabase
      .from("organisations")
      .select("features")
      .eq("id", ctx.org.id)
      .single(),
    getCurrentPlatformDocuments(),
    getOrganisationAcceptanceEvents(ctx.org.id),
    supabase
      .from("ai_systems")
      .select("*", { count: "exact", head: true })
      .eq("organisation_id", ctx.org.id),
    getLatestDriftStatus(ctx.org.id),
  ])

  const features = orgRow?.features ?? {}

  const acceptedDocumentIds = new Set(
    acceptanceEvents.map((e) => e.document_id),
  )

  const docsWithStatus = currentDocs.map((doc) => ({
    ...doc,
    acceptanceStatus: acceptedDocumentIds.has(doc.id)
      ? ("accepted" as const)
      : ("missing" as const),
  }))

  const hasAcceptedAllDocs =
    docsWithStatus.length > 0 &&
    docsWithStatus.every((d) => d.acceptanceStatus === "accepted")

  const acceptedOn = acceptanceEvents.length
    ? formatDate(
        acceptanceEvents
          .map((e) => e.accepted_at)
          .filter(Boolean)
          .sort()
          .at(-1),
      )
    : null

  const rawCompleteness = computeCompleteness({
    currentDocs: docsWithStatus,
    hasAISystems: (aiSystemsCount ?? 0) > 0,
    hasAccountability: true,
  })

  const completeness = {
    ...rawCompleteness,
    breakdown: {
      ...rawCompleteness.breakdown,
      outdatedDocs: [] as string[],
    },
  }

  const canEditFeatures = hasRole(ctx, ["owner", "admin"])

  const acceptedDocuments = acceptanceEvents.map((e: AcceptanceEvent) => ({
    name: e.document_name,
    version: e.version,
    accepted_at: e.accepted_at,
    content_hash: e.content_hash,
  }))

  const requiredCount =
    completeness.breakdown.requiredDocs.length +
    (completeness.breakdown.hasAISystems ? 0 : 1) +
    (completeness.breakdown.hasAccountability ? 0 : 1)

  const missingCount =
    completeness.breakdown.missingDocs.length +
    (completeness.breakdown.hasAISystems ? 0 : 1) +
    (completeness.breakdown.hasAccountability ? 0 : 1)

  const progressLabel =
    requiredCount > 0
      ? `${Math.max(requiredCount - missingCount, 0)} of ${requiredCount} recorded`
      : "—"

  return (
    <main className="bg-slate-100/70">
      <div className="mx-auto max-w-[1120px] px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <div className="space-y-8 sm:space-y-10">
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:px-6 sm:py-6">
            <DashboardHeader
              organisationName={ctx.org.name}
              userEmail={ctx.user?.email ?? undefined}
              role={ctx.role ?? "member"}
            />
          </div>

          {/* GOVERNANCE STATUS */}
          <SectionCard
            title="Governance status"
            description={`Your governance record is built from accepted platform documents, declared accountability, and registered AI systems. Progress: ${progressLabel}.`}
          >
            <div className="space-y-6">
              <ComplianceCompletenessCard
                completeness={completeness}
                organisationId={ctx.org.id}
              />

              <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Drift monitoring
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Drift is detected by comparing cryptographically sealed
                  governance snapshots over time. No behavioural monitoring is
                  performed.
                </p>
                <div className="mt-4">
                  <DriftStatusCard
                    status={driftStatus.status}
                    detectedAt={driftStatus.detected_at}
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* EVIDENCE OUTPUTS */}
          <SectionCard
            title="Evidence outputs"
            description="Generate externally shareable, audit-ready exports. Evidence Packs provide immutable acceptance records and verifiable integrity."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
                <OrganisationOverview name={ctx.org.name} memberCount={1} />
              </div>

              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
                  <EvidencePackCard organisationId={ctx.org.id} />
                </div>

                <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    Evidence Pack availability
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Control whether Evidence Pack exports are enabled for this
                    organisation. Only owners/admins can change this setting.
                  </p>

                  <div className="mt-4">
                    <FeatureToggle
                      organisationId={ctx.org.id}
                      featureKey="evidence_pack"
                      enabled={Boolean((features as any)?.evidence_pack)}
                      canEdit={canEditFeatures}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* GOVERNANCE INPUTS */}
          <SectionCard
            title="Governance inputs"
            description="These inputs define what can be sealed, verified, and exported. Keep them current and acceptance-bound."
          >
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
                <LegalStatusTable
                  organisationId={ctx.org.id}
                  rows={docsWithStatus.map((doc) => ({
                    id: doc.id,
                    name: doc.name,
                    version: doc.version,
                    status: doc.acceptanceStatus,
                  }))}
                />
              </div>

              {canEditFeatures && !hasAcceptedAllDocs && (
                <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
                  <AcceptDocumentsCTA
                    organisationId={ctx.org.id}
                    acceptedOn={acceptedOn}
                    acceptedDocuments={acceptedDocuments}
                  />
                </div>
              )}

              <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-6">
                <p className="text-sm font-semibold text-slate-900">
                  Accountability structure
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Responsibility mapping clarifies who holds operational and
                  legal accountability under your governance model.
                </p>
                <div className="mt-5">
                  <ResponsibilityMap />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* AUDIT LOG */}
          <SectionCard
            title="Audit & traceability"
            description="System-generated records derived from governance actions (e.g. document acceptance). Use this to support external review and internal assurance."
          >
            <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
              <EvidenceLog
                organisationId={ctx.org.id}
                events={acceptanceEvents.map((e) => ({
                  accepted_at: e.accepted_at,
                }))}
              />
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  )
}
