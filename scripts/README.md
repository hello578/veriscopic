# Evidence Pack Scripts

This folder contains **Node-executed scripts** used to generate
sample or offline artefacts (e.g. public demo PDFs).

## Why core vs wrapper exists

PDF rendering is split into two layers:

### 1. `export-evidence-pdf.core.ts`
- Pure Node-compatible code
- No `server-only`
- Safe to execute via `tsx`, cron, or CLI
- Used by scripts and background jobs

### 2. `export-evidence-pdf.ts`
- Next.js server wrapper
- Includes `server-only`
- Used by app routes and authenticated exports
- Calls the core renderer internally

⚠️ Do not import `server-only` files into scripts.
Doing so will break Node execution.

## Rule of thumb

- Scripts → **core**
- App routes → **wrapper**
