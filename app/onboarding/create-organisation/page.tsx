import { createOrganisation } from './actions'

export default function CreateOrganisationPage() {
  return (
    <main className="p-10 max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">
        Create your organisation
      </h1>

      <p className="text-muted-foreground">
        Every Veriscopic workspace belongs to an organisation.
      </p>

      <form action={createOrganisation} className="space-y-4">
        <input
          name="name"
          type="text"
          required
          placeholder="Organisation name"
          className="w-full rounded-md border p-3"
        />

        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-white"
        >
          Create organisation
        </button>
      </form>
    </main>
  )
}

