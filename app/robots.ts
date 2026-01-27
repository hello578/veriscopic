// app/robots.ts

import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/auth/",
          "/admin/",
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: "https://veriscopic.com/sitemap.xml",
  }
}
