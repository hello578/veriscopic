// lib/legal/export-evidence-pdf.ts
import { PDFDocument, StandardFonts } from "pdf-lib";
import type { EvidencePack } from "./export-evidence";

export async function renderEvidencePackPdf(pack: EvidencePack): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const addPage = () => {
    const page = pdf.addPage([595.28, 841.89]); // A4
    return page;
  };

  const margin = 48;
  const lineH = 14;

  const drawText = (page: any, text: string, x: number, y: number, bold = false, size = 11) => {
    page.drawText(text, { x, y, size, font: bold ? fontBold : font });
  };

  // --- Cover page ---
  {
    const page = addPage();
    let y = 841.89 - margin;

    drawText(page, "Veriscopic Evidence Pack", margin, y, true, 20);
    y -= 28;

    drawText(page, `Organisation ID: ${pack.organisation_id}`, margin, y, false, 12);
    y -= 18;
    drawText(page, `Generated at (UTC): ${pack.generated_at}`, margin, y, false, 12);
    y -= 18;

    drawText(page, "Checksum", margin, y, true, 12);
    y -= 16;
    drawText(page, `Algorithm: ${pack.checksum.algorithm}`, margin, y);
    y -= 14;
    drawText(page, `SHA-256: ${pack.checksum.canonical_json_sha256}`, margin, y);
    y -= 24;

    drawText(page, "What this proves", margin, y, true, 12);
    y -= 16;
    const bullets = [
      "This pack is derived from append-only acceptance evidence.",
      "Each acceptance event is bound to a document version via content hash.",
      "The checksum allows independent verification of pack integrity.",
    ];
    for (const b of bullets) {
      drawText(page, `• ${b}`, margin, y);
      y -= 14;
    }

    y -= 10;
    drawText(page, "Signature (optional)", margin, y, true, 12);
    y -= 28;
    drawText(page, "Name: ____________________________", margin, y);
    y -= 18;
    drawText(page, "Role: ____________________________", margin, y);
    y -= 18;
    drawText(page, "Date: ____________________________", margin, y);
  }

  // --- Evidence listing ---
  {
    let page = addPage();
    let y = 841.89 - margin;

    drawText(page, "Recorded Acceptance Evidence", margin, y, true, 16);
    y -= 26;

    // Table-ish layout
    for (let i = 0; i < pack.evidence.length; i++) {
      const e = pack.evidence[i];

      const block = [
        `Document: ${e.document_name}`,
        `Version: ${e.version}`,
        `Jurisdiction: ${e.jurisdiction ?? '—'}`,
        `Content hash: ${e.content_hash}`,
        `Accepted at (UTC): ${e.accepted_at}`,
      ];

      const needed = block.length * lineH + 12;
      if (y - needed < margin) {
        page = addPage();
        y = 841.89 - margin;
      }

      drawText(page, block[0], margin, y, true, 12); y -= lineH + 2;
      for (const line of block.slice(1)) {
        drawText(page, line, margin, y, false, 10);
        y -= lineH;
      }
      y -= 10;
    }

    if (pack.evidence.length === 0) {
      drawText(page, "No acceptance evidence found for this organisation.", margin, y);
    }
  }

  return await pdf.save();
}
