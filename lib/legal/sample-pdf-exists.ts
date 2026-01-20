// lib/legal/sample-pdf-exists.ts

import fs from 'fs'
import path from 'path'

export function sampleEvidencePdfExists() {
  const filePath = path.join(
    process.cwd(),
    'public/sample/veriscopic-evidence-pack-sample.pdf'
  )

  return fs.existsSync(filePath)
}
