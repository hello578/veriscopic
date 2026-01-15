// lib/legal/document-labels.ts

export function labelForDocumentSlug(slug: string) {
  switch (slug) {
    case 'platform-terms':
      return 'Platform Terms'
    case 'privacy-notice':
      return 'Privacy Notice'
    case 'ai-governance-disclosure':
      return 'AI Governance Disclosure'
    default:
      return slug
  }
}
