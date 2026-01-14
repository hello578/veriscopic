import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import AcceptForm from './accept-form'

type SearchParams = {
  next?: string
}

export default async function LegalAcceptPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  /**
   * Initialise Supabase (server-side, cookie-aware)
   */
  const supabase = await supabaseServerRead()

  /**
   * Enforce authentication
   */
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser()

  if (userErr) {
    throw new Error(userErr.message)
  }

  if (!user) {
    console.log('[legal/accept] no user yet')

  }

  /**
   * Resolve search params (Next 16 requirement)
   */
  const resolvedSearchParams = await searchParams

  /**
   * Resolve organisation context
   * We REQUIRE an organisation-scoped return path
   */
  const nextPath = resolvedSearchParams.next

  if (!nextPath) {
    throw new Error(
      'Missing return path for legal acceptance. Organisation context is required.'
    )
  }

  /**
   * Extract organisationId safely from /{organisationId}/...
   */
  const organisationId = nextPath.split('/')[1]

  if (!organisationId) {
    throw new Error(
      'Invalid return path. Organisation context could not be resolved.'
    )
  }

  /**
   * Load currently active legal documents
   */
  const { data: currentDocs, error: currentErr } = await supabase
    .from('legal_documents_current')
    .select('id')
    .eq('active', true)

  if (currentErr) {
    throw new Error(currentErr.message)
  }

  if (!currentDocs || currentDocs.length === 0) {
    throw new Error(
      'No active legal documents configured. Legal acceptance gate cannot be enforced.'
    )
  }

  const currentIds = currentDocs.map((d) => d.id)

  /**
   * Load full document content
   */
  const { data: docs, error: docsErr } = await supabase
    .from('legal_documents')
    .select('id, name, version, content, jurisdiction')
    .in('id', currentIds)

  if (docsErr) {
    throw new Error(docsErr.message)
  }

  if (!docs || docs.length === 0) {
    throw new Error(
      'Active legal documents found, but content could not be loaded.'
    )
  }

  /**
   * Render acceptance UI
   */
  return (
    <main className="p-10 max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">Legal acceptance</h1>

      <p className="text-muted-foreground">
        Please review and accept the following documents to continue.
      </p>

      <AcceptForm docs={docs} nextPath={nextPath} />
    </main>
  )
}


