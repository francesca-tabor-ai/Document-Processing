import { NextRequest, NextResponse } from "next/server";
import { query, isDatabaseConfigured } from "@/lib/db";

type Classification = { classification_type: string; confidence: number };
type Summary = { summary_type: string; content: string };
type ExtractedData = { field_name: string; field_value: string | null; confidence: number | null };
type Document = { id: string; name: string; file_type: string; status: string; uploaded_at: string };

/** Mock intelligence for demo when DB not configured or doc not in DB */
function getMockIntelligence(id: string) {
  const mockByDoc: Record<string, { document: Document; classifications: Classification[]; summaries: Summary[]; extracted: ExtractedData[] }> = {
    "1": {
      document: {
        id: "1",
        name: "Contract_NDA_2024.pdf",
        file_type: "application/pdf",
        status: "processed",
        uploaded_at: "2024-02-20T00:00:00.000Z",
      },
      classifications: [
        { classification_type: "document_type", confidence: 0.98 },
        { classification_type: "sensitivity", confidence: 0.92 },
      ],
      summaries: [
        {
          summary_type: "brief",
          content:
            "Standard mutual NDA template covering confidentiality, term, and return of materials. No unusual clauses.",
        },
        {
          summary_type: "key_terms",
          content:
            "Term: 2 years. Governing law: Delaware. Liability cap: standard. No non-compete.",
        },
      ],
      extracted: [
        { field_name: "document_title", field_value: "Mutual Non-Disclosure Agreement", confidence: 0.95 },
        { field_name: "effective_date", field_value: "2024-01-15", confidence: 0.88 },
        { field_name: "party_count", field_value: "2", confidence: 0.99 },
      ],
    },
    "2": {
      document: {
        id: "2",
        name: "Q3_Financials.xlsx",
        file_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        status: "pending",
        uploaded_at: "2024-02-19T00:00:00.000Z",
      },
      classifications: [{ classification_type: "document_type", confidence: 0.94 }],
      summaries: [
        {
          summary_type: "brief",
          content: "Q3 revenue $2.4M, up 12% YoY. Gross margin 62%. Key highlight: enterprise segment growth.",
        },
      ],
      extracted: [
        { field_name: "quarter", field_value: "Q3 2024", confidence: 1 },
        { field_name: "revenue", field_value: "$2.4M", confidence: 0.91 },
      ],
    },
    "3": {
      document: {
        id: "3",
        name: "Pitchbook_Acme.pptx",
        file_type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        status: "processing",
        uploaded_at: "2024-02-18T00:00:00.000Z",
      },
      classifications: [],
      summaries: [],
      extracted: [],
    },
  };

  const mock = mockByDoc[id];
  if (!mock) {
    // Fallback for seeded document UUID
    if (id === "c0000001-0000-4000-8000-000000000001") {
      const seed = mockByDoc["1"];
      return {
        document: { ...seed.document, id, name: "NDA_Template_2024.pdf" },
        classifications: seed.classifications,
        summaries: seed.summaries,
        extracted_data: seed.extracted,
      };
    }
    return null;
  }
  return {
    document: mock.document,
    classifications: mock.classifications,
    summaries: mock.summaries,
    extracted_data: mock.extracted,
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  if (!id) {
    return NextResponse.json({ error: "Document ID required" }, { status: 400 });
  }

  try {
    if (isDatabaseConfigured()) {
      const [docRes, classRes, sumRes, extRes] = await Promise.all([
        query<Document>(
          "SELECT id, name, file_type, status, uploaded_at FROM documents WHERE id = $1",
          [id]
        ),
        query<Classification>(
          "SELECT classification_type, confidence FROM document_classifications WHERE document_id = $1 ORDER BY confidence DESC",
          [id]
        ),
        query<Summary>(
          "SELECT summary_type, content FROM document_summaries WHERE document_id = $1",
          [id]
        ),
        query<ExtractedData>(
          "SELECT field_name, field_value, confidence FROM extracted_data WHERE document_id = $1 ORDER BY field_name",
          [id]
        ),
      ]);

      const document = docRes.rows[0];
      if (!document) {
        const mock = getMockIntelligence(id);
        if (mock) return NextResponse.json(mock);
        return NextResponse.json({ error: "Document not found" }, { status: 404 });
      }

      return NextResponse.json({
        document,
        classifications: classRes.rows,
        summaries: sumRes.rows,
        extracted_data: extRes.rows,
      });
    }

    const mock = getMockIntelligence(id);
    if (mock) return NextResponse.json(mock);
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Intelligence fetch error:", e);
    }
    return NextResponse.json(
      { error: "Failed to load document intelligence" },
      { status: 500 }
    );
  }
}
