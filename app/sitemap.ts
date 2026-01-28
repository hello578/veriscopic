import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://veriscopic.com"
  const now = new Date()

  return [
    // ======================
    // HOMEPAGE — CATEGORY ANCHOR
    // ======================
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ======================
    // WHY / POSITIONING (FOUNDATIONAL)
    // ======================
    {
      url: `${baseUrl}/why`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },

    // ======================
    // BOARD & BUYER PAGES (WHO IT'S FOR)
    // ======================
    {
      url: `${baseUrl}/boards`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/boards/regulated`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boards/public-bodies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boards/charities`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ======================
    // CORE PRODUCT / CAPABILITY PILLARS
    // ======================
    {
      url: `${baseUrl}/evidence`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/evidence-packs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/drift`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/drift/how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/verify`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },

    // ======================
    // GOVERNANCE THEORY / CATEGORY OWNERSHIP
    // ======================
    {
      url: `${baseUrl}/governance-evidence-model`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/governance-principles`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },

    // ======================
    // COMPARISON / CHALLENGER PAGES
    // ======================
    {
      url: `${baseUrl}/compare/evidence-vs-compliance-automation`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/compare/why-ai-compliance-checklists-fail`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.75,
    },

    // ======================
    // INSIGHTS HUB (AUTHORITY)
    // ======================
    {
      url: `${baseUrl}/insights`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    // Flagship board / regulatory authority pieces
    {
      url: `${baseUrl}/insights/governance-evidence/from-policy-to-proof`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights/ai-act/procurement-evidence`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights/risk-insurance/ai-risk-underwriting`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },

    // Sector-specific authority (new emphasis)
    {
      url: `${baseUrl}/insights/housing/evidencing-digital-governance`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/insights/health/evidencing-ai-governance`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/insights/charity/trustee-governance-evidence`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.85,
    },

    // ======================
    // TRUST / COMMERCIAL
    // ======================
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },

    // ======================
    // LEGAL (LOW PRIORITY)
    // ======================
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]
}
