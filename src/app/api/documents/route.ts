import { NextResponse } from "next/server";

export async function GET() {
  // TODO: list documents from DB with pagination/filters
  return NextResponse.json({ documents: [] });
}
