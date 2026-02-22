import { NextResponse } from "next/server";
import { AI_PROVIDER_ENV_KEYS } from "@/lib/ai/config";
import { isDatabaseConfigured, query } from "@/lib/db";

export async function GET() {
  const timestamp = new Date().toISOString();
  const hasOpenAI = Boolean(process.env[AI_PROVIDER_ENV_KEYS.openai]);
  const hasGemini = Boolean(process.env[AI_PROVIDER_ENV_KEYS.gemini]);
  const aiReady = hasOpenAI || hasGemini;

  let dbStatus: "connected" | "disconnected" | "unconfigured" = "unconfigured";
  if (isDatabaseConfigured()) {
    try {
      await query("SELECT 1");
      dbStatus = "connected";
    } catch {
      dbStatus = "disconnected";
    }
  }

  return NextResponse.json({
    status: "ok",
    timestamp,
    aiConfigured: aiReady,
    database: dbStatus,
  });
}
