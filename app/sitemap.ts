// app/sitemap.ts

import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://veriscopic.com"
  const now = new Date()

  return [
    // Homepage — category anchor
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ======================
    // CORE CATEGORY PAGES
    // ======================

    {
      url: `${baseUrl}/boards`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/boards/regulated`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/boards/public-bodies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/charities`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    // ======================
    // CORE PRODUCT PAGES
    // ======================

    {
      url: `${baseUrl}/evidence`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/verify`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // (Intentionally NOT indexing /evidence/request or booking flows)

    // ======================
    // INSIGHTS HUB (AUTHORITY)
    // ======================

    {
      url: `${baseUrl}/insights`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ======================
    // FLAGSHIP AUTHORITY ARTICLES
    // ======================

    {
      url: `${baseUrl}/insights/governance/policies-vs-evidence`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/insights/ai-act/procurement-evidence`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/insights/risk-insurance/ai-risk-underwriting`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.85,
    },

    // ======================
    // LEGAL & TRUST (LOW PRIORITY)
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
