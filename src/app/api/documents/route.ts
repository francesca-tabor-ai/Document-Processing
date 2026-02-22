import { NextResponse } from "next/server";

export async function GET() {
  try {
    // TODO: list documents from DB with pagination/filters
    return NextResponse.json({ documents: [] });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Documents list error:", e);
    }
    return NextResponse.json(
      { error: "Failed to load documents" },
      { status: 500 }
    );
  }
}
