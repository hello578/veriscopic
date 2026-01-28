// app/press/page.tsx

import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Press & Public Statements",
  description:
    "Official information for journalists, researchers, and institutional stakeholders. Approved boilerplates, contact details, and canonical links to Veriscopic briefings.",
}

export default function PressPage() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-24">
      <h1>Press &amp; Public Statements</h1>

      <p>
        This page provides official information for journalists, researchers,
        and institutional stakeholders seeking accurate, up-to-date references
        about Veriscopic.
      </p>

      <h2>About Veriscopic</h2>

      <p>
        Veriscopic is an evidence-first governance platform focused on helping
        organisations demonstrate how their digital and AI systems are governed
        in practice — not only in policy.
      </p>

      <p>
        We support board oversight, procurement scrutiny, and regulatory review
        by producing structured, timestamped, audit-ready records that can be
        independently assessed.
      </p>

      <h2>Current press status</h2>

      <p>
        Veriscopic does not actively pursue broad press coverage at this stage.
        We prioritise direct engagement with operators, reviewers, and
        institutional stakeholders, and publish written briefings via our
        Insights section.
      </p>

      <h2>Approved boilerplate</h2>

      <h3>Short description</h3>

      <p>
        Veriscopic is an evidence-first AI governance platform that helps
        organisations demonstrate how digital and AI systems are governed in
        practice. It produces structured, timestamped governance records and
        audit-ready evidence packs designed for procurement, regulatory review,
        and insurance scrutiny.
      </p>

      <h3>Long description</h3>

      <p>
        Veriscopic is an evidence-first governance platform designed for
        organisations facing increasing scrutiny of digital and AI systems from
        procurement teams, regulators, insurers, and investors.
      </p>

      <p>
        Veriscopic addresses that gap by capturing governance decisions, system
        ownership, and supporting artefacts as structured, timestamped records.
      </p>

      <h2>Canonical briefings</h2>

      <ul>
        <li>
          <Link href="/insights">Insights</Link>
        </li>
        <li>
          <Link href="/compare/evidence-vs-compliance-automation">
            Evidence-based AI governance vs compliance automation platforms
          </Link>
        </li>
        <li>
          <Link href="/compare/why-ai-compliance-checklists-fail">
            Why AI compliance checklists fail procurement review
          </Link>
        </li>
        <li>
          <Link href="/press/accountability-based-evidence">
            Veriscopic introduces accountability-based evidence for AI governance
          </Link>
        </li>
      </ul>

      <h2>Press and research enquiries</h2>

      <p>
        For press, research, or speaking enquiries, contact:
        <br />
        <a href="mailto:press@veriscopic.com">press@veriscopic.com</a>
      </p>

      <hr />

      <p>
        <em>
          Please use the boilerplate above when referencing Veriscopic to ensure
          accuracy and consistency.
        </em>
      </p>
    </article>
  )
}
