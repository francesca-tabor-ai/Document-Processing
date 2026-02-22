import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "message/rfc822",
]);
const ALLOWED_EXTENSIONS = new Set([
  "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "eml",
]);

function getExtension(name: string): string {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

function isAllowedFile(file: File): { ok: true } | { ok: false; error: string } {
  if (file.size > MAX_SIZE_BYTES) {
    return { ok: false, error: `File size exceeds ${MAX_SIZE_MB}MB limit` };
  }
  const ext = getExtension(file.name);
  if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
    return { ok: false, error: "Unsupported file type. Use PDF, Word, Excel, PPT, or Email." };
  }
  const mime = file.type?.toLowerCase();
  if (mime && !ALLOWED_MIME_TYPES.has(mime)) {
    return { ok: false, error: "Unsupported file type. Use PDF, Word, Excel, PPT, or Email." };
  }
  return { ok: true };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }
    const allowed = isAllowedFile(file);
    if (!allowed.ok) {
      return NextResponse.json(
        { error: allowed.error },
        { status: 400 }
      );
    }
    // TODO: upload to S3, insert document + audit log
    return NextResponse.json({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      status: "uploaded",
    });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Upload error:", e);
    }
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
