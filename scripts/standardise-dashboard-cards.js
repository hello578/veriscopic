/**
 * Standardise dashboard card spacing
 * Safe, idempotent, reviewable
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TARGET_FILES = [
  'app/(org)/[organisationId]/dashboard/components/evidence-log.tsx',
  'app/(org)/[organisationId]/dashboard/components/legal-status-table.tsx',
  'app/(org)/[organisationId]/dashboard/components/compliance-completeness-card.tsx',
  'app/(org)/[organisationId]/dashboard/components/organisation-overview.tsx',
  'app/(org)/[organisationId]/dashboard/components/responsibility-map.tsx',
]

function updateFile(filePath) {
  const abs = path.resolve(__dirname, '..', filePath)

  if (!fs.existsSync(abs)) {
    console.warn(`⚠️  Skipping missing file: ${filePath}`)
    return
  }

  const src = fs.readFileSync(abs, 'utf8')
  let updated = src

  // CardHeader padding
  updated = updated.replace(
    /<CardHeader([^>]*)className="([^"]*)">/g,
    (_m, pre, classes) => {
      if (classes.includes('px-')) {
        return `<CardHeader${pre}className="${classes}">`
      }
      return `<CardHeader${pre}className="${classes} px-6 pb-6">`
    }
  )

  // CardContent padding
  updated = updated.replace(
    /<CardContent([^>]*)className="([^"]*)">/g,
    (_m, pre, classes) => {
      if (classes.includes('px-')) {
        return `<CardContent${pre}className="${classes}">`
      }
      return `<CardContent${pre}className="${classes} px-6 pt-0 pb-6">`
    }
  )

  if (updated !== src) {
    fs.writeFileSync(abs, updated)
    console.log(`✅ Updated ${filePath}`)
  } else {
    console.log(`ℹ️  No changes needed in ${filePath}`)
  }
}

TARGET_FILES.forEach(updateFile)

console.log('\n✨ Dashboard card spacing standardised.')
