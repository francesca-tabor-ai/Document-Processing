"use client";

import * as React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const ALLOWED_TYPES =
  "application/pdf,.doc,.docx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xls,.xlsx,application/vnd.ms-powerpoint,.pptx,.eml";
const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

type DocStatus = "Processed" | "Pending review" | "Processing" | "Queued";
type DocumentItem = {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  owner: string;
  status: DocStatus;
};

const MOCK_DOCS: DocumentItem[] = [
  { id: "1", name: "Contract_NDA_2024.pdf", type: "PDF", uploadedAt: "2024-02-20", owner: "You", status: "Processed" },
  { id: "2", name: "Q3_Financials.xlsx", type: "Excel", uploadedAt: "2024-02-19", owner: "You", status: "Pending review" },
  { id: "3", name: "Pitchbook_Acme.pptx", type: "PPT", uploadedAt: "2024-02-18", owner: "You", status: "Processing" },
];

export default function DocumentsPage() {
  const [dragActive, setDragActive] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fileList, setFileList] = React.useState<DocumentItem[]>(MOCK_DOCS);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_SIZE_BYTES) {
      return `${file.name}: max size ${MAX_SIZE_MB}MB`;
    }
    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "eml"];
    if (!ext || !allowed.includes(ext)) {
      return `${file.name}: unsupported format. Use PDF, Word, Excel, PPT, or Email.`;
    }
    return null;
  };

  const handleFiles = React.useCallback((files: FileList | null) => {
    if (!files?.length) return;
    setError(null);
    for (let i = 0; i < files.length; i++) {
      const err = validateFile(files[i]);
      if (err) {
        setError(err);
        return;
      }
    }
    // Simulate add to list
    const toAdd: DocumentItem[] = Array.from(files).map((f, idx) => ({
      id: `new-${Date.now()}-${idx}`,
      name: f.name,
      type: (f.name.split(".").pop() ?? "").toUpperCase(),
      uploadedAt: new Date().toISOString().slice(0, 10),
      owner: "You",
      status: "Queued" as DocStatus,
    }));
    setFileList((prev) => [...toAdd, ...prev]);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => setDragActive(false);

  const exportList = React.useCallback((format: "csv" | "json") => {
    if (format === "csv") {
      const headers = ["Name", "Type", "Uploaded", "Owner", "Status"];
      const rows = fileList.map((d) =>
        [d.name, d.type, d.uploadedAt, d.owner, d.status]
          .map((cell) => (/\n|,|"/.test(String(cell)) ? `"${String(cell).replace(/"/g, '""')}"` : cell))
          .join(",")
      );
      const csv = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `document-library-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const blob = new Blob([JSON.stringify(fileList, null, 2)], {
        type: "application/json;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `document-library-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [fileList]);

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-primary">Documents</h1>
      <p className="mb-8 text-grey-600">
        Upload and manage documents. PDF, Word, Excel, PPT, and email supported.
      </p>

      <Card
        className={`mb-8 border-2 border-dashed transition-colors ${
          dragActive ? "border-primary bg-grey-50" : "border-grey-200"
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="mb-2 font-medium text-primary">
            Drag and drop files here, or click to browse
          </p>
          <p className="mb-4 text-sm text-grey-500">
            Max {MAX_SIZE_MB}MB per file. PDF, Word, Excel, PPT, Email.
          </p>
          <input
            type="file"
            multiple
            accept={ALLOWED_TYPES}
            className="max-w-xs text-sm text-grey-600 file:mr-4 file:rounded-md file:border-0 file:bg-grey-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-grey-200"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {error && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Document library</h2>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => exportList("csv")}>
              Export CSV
            </Button>
            <Button variant="secondary" size="sm" onClick={() => exportList("json")}>
              Export JSON
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-grey-200 text-left text-grey-600">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Uploaded</th>
                  <th className="pb-3 font-medium">Owner</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fileList.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-grey-100 last:border-0"
                  >
                    <td className="py-3 font-medium text-primary">{doc.name}</td>
                    <td className="py-3 text-grey-600">{doc.type}</td>
                    <td className="py-3 text-grey-600">{doc.uploadedAt}</td>
                    <td className="py-3 text-grey-600">{doc.owner}</td>
                    <td className="py-3">
                      <Badge
                        variant={
                          doc.status === "Processed"
                            ? "success"
                            : doc.status === "Pending review"
                              ? "warning"
                              : "default"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/documents/${doc.id}`}
                        className="text-sm font-medium text-primary underline-offset-2 hover:underline"
                      >
                        View Intelligence
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
