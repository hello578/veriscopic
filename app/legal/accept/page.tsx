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
  // Initialise Supabase (server-side, cookie-aware)
  const supabase = await supabaseServerRead()


  // Enforce authentication
  const { data: userData, error: userErr } = await supabase.auth.getUser()
  if (userErr) {
    throw new Error(userErr.message)
  }

  const user = userData.user
  if (!user) {
    redirect('/auth/login')
  }

  // Load currently active legal documents
  const { data: currentDocs, error: currentErr } = await supabase
    .from('legal_documents_current')
    .select('id')
    .eq('active', true)

  if (currentErr) {
    throw new Error(currentErr.message)
  }

  // 🔒 HARD FAIL if no active legal documents exist
  if (!currentDocs || currentDocs.length === 0) {
    throw new Error(
      'No active legal documents configured. Legal acceptance gate cannot be enforced.'
    )
  }

  const currentIds = currentDocs.map((d: { id: string }) => d.id)

  // Load full document content for display
  const { data: docs, error: docsErr } = await supabase
    .from('legal_documents')
    .select('id, name, version, content, jurisdiction')
    .in('id', currentIds)

  if (docsErr) {
    throw new Error(docsErr.message)
  }

  // 🔒 HARD FAIL if current IDs exist but content does not
  if (!docs || docs.length === 0) {
    throw new Error(
      'Active legal documents found, but content could not be loaded.'
    )
  }

  // Resolve async searchParams (Next.js 16 requirement)
  const resolvedSearchParams = await searchParams

  // 🔐 SAFE redirect target (prevents open redirects)
  const next =
    resolvedSearchParams?.next &&
    resolvedSearchParams.next.startsWith('/')
      ? resolvedSearchParams.next
      : '/dashboard'

  return (
    <main className="p-10 max-w-3xl">
      <h1 className="text-3xl font-bold">Legal acceptance</h1>

      <p className="mt-2 text-gray-600">
        Please review and accept the following documents to continue.
      </p>

      <AcceptForm docs={docs} nextPath={next} />
    </main>
  )
}

