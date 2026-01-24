
// app/evidence/request/page.tsx


"use client"

import { useState } from "react"

export default function RequestEvidencePackPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      email: data.get("email"),
      organisation: data.get("organisation"),
      role: data.get("role"),
      intendedUse: data.get("intendedUse"),
      message: data.get("message"),
    }

    const res = await fetch("/api/evidence/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      setError("Something went wrong. Please try again.")
      setLoading(false)
      return
    }

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Request an Evidence Pack
      </h1>

      <p className="mt-4 text-slate-600">
        Request access to a Veriscopic AI governance evidence pack for
        procurement, audit, or regulatory review.
      </p>

      {submitted ? (
        <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6">
          <p className="font-medium">
            Thank you — your request has been received.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            We’ll review your request and be in touch shortly.
          </p>
        </div>
      ) : (
        <form className="mt-12 space-y-6" onSubmit={onSubmit}>
          <Input label="Work email" name="email" type="email" required />
          <Input label="Organisation" name="organisation" required />

          <Select
            label="Your role"
            name="role"
            options={[
              "Founder / Executive",
              "CTO / Engineering",
              "Compliance / Risk",
              "Legal",
              "Procurement",
              "Insurer / Advisor",
              "Other",
            ]}
          />

          <Select
            label="Intended use"
            name="intendedUse"
            options={[
              "Procurement review",
              "Regulatory preparation",
              "Insurance or underwriting",
              "Internal governance",
              "Investor or board review",
              "Exploratory / evaluation",
            ]}
          />

          <Textarea
            label="Additional context (optional)"
            name="message"
          />

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Submitting…" : "Submit request"}
          </button>
        </form>
      )}
    </main>
  )
}

function Input(props: any) {
  return (
    <div>
      <label className="block text-sm font-medium">{props.label}</label>
      <input
        {...props}
        className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm"
      />
    </div>
  )
}

function Select({ label, name, options }: any) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select
        name={name}
        required
        className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm"
      >
        <option value="">Select…</option>
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

function Textarea({ label, name }: any) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        name={name}
        rows={4}
        className="mt-2 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm"
      />
    </div>
  )
}
