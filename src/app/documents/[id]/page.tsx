"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type Classification = { classification_type: string; confidence: number };
type Summary = { summary_type: string; content: string };
type ExtractedData = { field_name: string; field_value: string | null; confidence: number | null };
type Document = { id: string; name: string; file_type: string; status: string; uploaded_at: string };

type IntelligenceData = {
  document: Document;
  classifications: Classification[];
  summaries: Summary[];
  extracted_data: ExtractedData[];
};

function confidenceVariant(conf: number): "success" | "warning" | "default" {
  if (conf >= 0.9) return "success";
  if (conf >= 0.7) return "warning";
  return "default";
}

function formatFieldName(name: string): string {
  return name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DocumentIntelligencePage() {
  const params = useParams();
  const id = params?.id as string;
  const [data, setData] = React.useState<IntelligenceData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [summaryView, setSummaryView] = React.useState<"brief" | "detailed">("brief");

  React.useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/documents/${id}/intelligence`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 404 ? "Document not found" : "Failed to load");
        return r.json();
      })
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const exportData = React.useCallback(
    (format: "json" | "csv") => {
      if (!data) return;
      if (format === "json") {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `intelligence-${data.document.name.replace(/\.[^.]+$/, "")}-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const rows: string[][] = [
          ["Field", "Value", "Confidence"],
          ...data.extracted_data.map((e) => [
            formatFieldName(e.field_name),
            e.field_value ?? "",
            e.confidence != null ? String(Math.round(e.confidence * 100) + "%") : "",
          ]),
        ];
        const csv = rows
          .map((row) =>
            row.map((cell) => (/\n|,|"/.test(String(cell)) ? `"${String(cell).replace(/"/g, '""')}"` : cell)).join(",")
          )
          .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `intelligence-${data.document.name.replace(/\.[^.]+$/, "")}-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    [data]
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-grey-500">Loading document intelligence…</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
          <p className="text-grey-600">{error ?? "Document not found."}</p>
          <Link href="/documents">
            <Button variant="secondary">Back to Documents</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const briefSummary = data.summaries.find((s) => s.summary_type === "brief");
  const keyTermsSummary = data.summaries.find((s) => s.summary_type === "key_terms");
  const uploadedDate = data.document.uploaded_at
    ? new Date(data.document.uploaded_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <DashboardLayout>
      <div className="mb-8">
        <Link
          href="/documents"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-grey-600 transition-colors hover:text-primary"
        >
          ← Back to Documents
        </Link>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">{data.document.name}</h1>
            <p className="mt-1 text-sm text-grey-500">
              Uploaded {uploadedDate} · {data.document.file_type}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={
                data.document.status === "processed"
                  ? "success"
                  : data.document.status === "processing" || data.document.status === "queued"
                    ? "default"
                    : "warning"
              }
            >
              {data.document.status}
            </Badge>
            <Button variant="secondary" size="sm" onClick={() => exportData("json")}>
              Export JSON
            </Button>
            <Button variant="secondary" size="sm" onClick={() => exportData("csv")}>
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Classifications */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-primary">Classification</h2>
            <p className="text-sm text-grey-500">AI-detected document attributes</p>
          </CardHeader>
          <CardContent>
            {data.classifications.length > 0 ? (
              <ul className="space-y-3">
                {data.classifications.map((c) => (
                  <li
                    key={c.classification_type}
                    className="flex items-center justify-between rounded-lg border border-grey-200 bg-grey-50/50 px-4 py-3"
                  >
                    <span className="font-medium text-primary">
                      {formatFieldName(c.classification_type)}
                    </span>
                    <Badge variant={confidenceVariant(c.confidence)}>
                      {Math.round(c.confidence * 100)}%
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-grey-500">No classifications yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Extracted Data */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-primary">Extracted Data</h2>
            <p className="text-sm text-grey-500">Structured fields from the document</p>
          </CardHeader>
          <CardContent>
            {data.extracted_data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-grey-200 text-left text-grey-600">
                      <th className="pb-2 font-medium">Field</th>
                      <th className="pb-2 font-medium">Value</th>
                      <th className="pb-2 font-medium">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.extracted_data.map((e) => (
                      <tr key={e.field_name} className="border-b border-grey-100 last:border-0">
                        <td className="py-2.5 font-medium text-primary">
                          {formatFieldName(e.field_name)}
                        </td>
                        <td className="py-2.5 text-grey-700">{e.field_value ?? "—"}</td>
                        <td className="py-2.5">
                          {e.confidence != null ? (
                            <Badge variant={confidenceVariant(e.confidence)}>
                              {Math.round(e.confidence * 100)}%
                            </Badge>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-grey-500">No extracted data yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summaries - full width */}
      {(briefSummary || keyTermsSummary) && (
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary">Summary</h2>
              <p className="text-sm text-grey-500">AI-generated document overview</p>
            </div>
            {briefSummary && keyTermsSummary && (
              <div className="flex gap-1 rounded-lg border border-grey-200 p-1">
                <button
                  onClick={() => setSummaryView("brief")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    summaryView === "brief"
                      ? "bg-grey-200 text-primary"
                      : "text-grey-600 hover:bg-grey-100"
                  }`}
                >
                  Brief
                </button>
                <button
                  onClick={() => setSummaryView("detailed")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    summaryView === "detailed"
                      ? "bg-grey-200 text-primary"
                      : "text-grey-600 hover:bg-grey-100"
                  }`}
                >
                  Key terms
                </button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-grey-50/80 p-4 text-grey-700">
              {summaryView === "brief" && briefSummary ? (
                <p className="leading-relaxed">{briefSummary.content}</p>
              ) : keyTermsSummary ? (
                <p className="leading-relaxed">{keyTermsSummary.content}</p>
              ) : briefSummary ? (
                <p className="leading-relaxed">{briefSummary.content}</p>
              ) : (
                <p className="text-grey-500">No summary available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next step CTA */}
      <div className="mt-8 flex justify-end">
        <Link href={`/review?document=${data.document.id}`}>
          <Button>Go to Review</Button>
        </Link>
      </div>
    </DashboardLayout>
  );
}
