import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_SIZE_MB = 50;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_SIZE_MB}MB limit` },
        { status: 400 }
      );
    }
    // TODO: validate type, upload to S3, insert document + audit log
    return NextResponse.json({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      status: "uploaded",
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
