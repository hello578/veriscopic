
// app/compare/why-ai-compliance-checklists-fail/page.tsx

export const metadata = {
  title: "Why AI Compliance Checklists Fail Procurement Review",
  description:
    "Why AI compliance checklists and questionnaires break down under procurement and regulatory review — and what evidence-based governance does differently.",
}

export default function ChecklistsFailPage() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-24">
      <h1>Why AI Compliance Checklists Fail Procurement Review</h1>

      <p>
        AI compliance checklists are widely used to assess governance readiness.
        They are easy to distribute, simple to complete, and familiar to many
        organisations.
      </p>

      <p>
        Yet under procurement and regulatory review, checklists frequently fail
        to provide what reviewers actually need.
      </p>

      <h2>The structural limitation of checklists</h2>

      <p>
        Checklists are designed to capture <em>assertions</em>, not evidence.
        They record whether an organisation claims a control exists, not how it
        is applied, enforced, or reviewed over time.
      </p>

      <p>
        This distinction is often invisible internally — but becomes critical
        under external scrutiny.
      </p>

      <h2>What procurement reviewers are actually assessing</h2>

      <p>
        Procurement teams do not evaluate governance in the abstract. They
        evaluate risk exposure and defensibility.
      </p>

      <p>
        In practice, this means asking:
      </p>

      <ul>
        <li>Which AI systems are in use?</li>
        <li>Who is accountable for each system?</li>
        <li>How were governance decisions made?</li>
        <li>When were they last reviewed?</li>
        <li>Can this be independently verified?</li>
      </ul>

      <h2>Why checklists break down</h2>

      <p>
        When governance information exists only in the form of completed
        questionnaires, reviewers are forced to rely on interpretation and trust.
      </p>

      <p>
        This increases review time, introduces uncertainty, and often results in
        follow-up requests for supporting documentation.
      </p>

      <h2>Evidence changes the review dynamic</h2>

      <p>
        Evidence-based governance replaces assertions with records.
        Instead of stating that a process exists, organisations can show when it
        was applied, by whom, and to which system.
      </p>

      <table>
        <thead>
          <tr>
            <th>Checklist-led governance</th>
            <th>Evidence-based governance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Self-reported answers</td>
            <td>Documented decisions</td>
          </tr>
          <tr>
            <td>Static snapshots</td>
            <td>Versioned records</td>
          </tr>
          <tr>
            <td>Interpretation required</td>
            <td>Externally verifiable</td>
          </tr>
          <tr>
            <td>Follow-up questions likely</td>
            <td>Review-ready artefacts</td>
          </tr>
        </tbody>
      </table>

      <h2>The procurement implication</h2>

      <p>
        As AI regulation matures, procurement teams increasingly favour
        organisations that can produce governance evidence without translation
        or reconstruction.
      </p>

      <p>
        This is not about replacing internal tools — it is about recognising
        where they stop being sufficient.
      </p>

      <p>
        Veriscopic exists to address that gap.
      </p>
    </article>
  )
}
