import { redirect } from 'next/navigation'
import { supabaseServerRead } from '@/lib/supabase/server-read'
import CreateOrganisationForm from './create-organisation-form'

export default async function CreateOrganisationPage() {
  const supabase = await supabaseServerRead()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // 🔐 Must be authenticated to onboard
  if (error || !user) {
    redirect('/auth/login')
  }

  return (
    <main className="p-10 max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">
        Create your organisation
      </h1>

      <p className="text-muted-foreground">
        Every Veriscopic workspace belongs to an organisation.
      </p>

      <CreateOrganisationForm />
    </main>
  )
}
