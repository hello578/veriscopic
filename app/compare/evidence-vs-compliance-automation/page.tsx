
// app/compare/evidence-vs-compliance-automation/page.tsx

export const metadata = {
  title: "Evidence-Based AI Governance vs Compliance Automation Platforms",
  description:
    "A practical comparison of evidence-based AI governance and compliance automation platforms, explaining why audit-ready evidence matters for procurement and regulation.",
}

export default function EvidenceVsAutomationPage() {
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-24">
      <h1>Evidence-Based AI Governance vs Compliance Automation Platforms</h1>

      <p>
        As organisations prepare for increased scrutiny under the EU AI Act,
        many are evaluating tools described as “AI compliance” or “governance”
        platforms. While these tools are often grouped together, they solve
        fundamentally different problems.
      </p>

      <p>
        This page explains the difference between <strong>evidence-based AI
        governance</strong> and <strong>compliance automation platforms</strong>,
        and why that distinction matters for procurement, audit, and regulatory
        review.
      </p>

      <h2>What compliance automation platforms are designed to do</h2>

      <p>
        Compliance automation platforms typically focus on internal assurance.
        They help organisations manage policies, questionnaires, controls, and
        self-reported attestations across areas such as security, privacy, and
        risk.
      </p>

      <p>
        These tools are often effective for:
      </p>

      <ul>
        <li>Centralising policies and procedures</li>
        <li>Tracking completion of controls or tasks</li>
        <li>Producing internal dashboards and scores</li>
        <li>Supporting recurring certifications</li>
      </ul>

      <p>
        However, they are not designed to produce externally verifiable evidence
        of how individual AI systems are governed in practice.
      </p>

      <h2>What evidence-based AI governance focuses on instead</h2>

      <p>
        Evidence-based AI governance starts from a different premise: that
        external reviewers do not evaluate intentions or dashboards — they
        evaluate records.
      </p>

      <p>
        Under the EU AI Act and emerging procurement expectations, reviewers
        increasingly look for:
      </p>

      <ul>
        <li>Explicit inventories of AI systems</li>
        <li>Clear ownership and accountability per system</li>
        <li>Documented governance decisions</li>
        <li>Versioned and timestamped artefacts</li>
        <li>Evidence that can withstand independent scrutiny</li>
      </ul>

      <h2>Conceptual comparison</h2>

      <table>
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Compliance automation platforms</th>
            <th>Evidence-based AI governance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary output</td>
            <td>Dashboards, scores, checklists</td>
            <td>Verifiable evidence packs</td>
          </tr>
          <tr>
            <td>Governance model</td>
            <td>Policy- and control-centric</td>
            <td>Record- and system-centric</td>
          </tr>
          <tr>
            <td>AI system granularity</td>
            <td>Abstract or aggregated</td>
            <td>Explicit per-system registry</td>
          </tr>
          <tr>
            <td>Audit posture</td>
            <td>Indirect support</td>
            <td>Audit-ready by design</td>
          </tr>
          <tr>
            <td>External scrutiny</td>
            <td>Assumed</td>
            <td>Explicitly supported</td>
          </tr>
        </tbody>
      </table>

      <h2>Why this distinction matters for procurement</h2>

      <p>
        Procurement teams and regulators are not tasked with validating internal
        dashboards. Their role is to assess whether an organisation can
        demonstrate compliance through defensible documentation.
      </p>

      <p>
        Where governance is captured only as internal assurance, organisations
        often struggle to respond to external requests without manual effort,
        interpretation, or rework.
      </p>

      <h2>Choosing the right approach</h2>

      <p>
        Compliance automation platforms can be appropriate where the primary
        goal is internal assurance and task tracking.
      </p>

      <p>
        Where the goal is to satisfy <strong>external procurement,
        regulatory, or insurance review</strong>, evidence-based AI governance
        becomes essential.
      </p>

      <p>
        Veriscopic is designed specifically for that second context.
      </p>
    </article>
  )
}
