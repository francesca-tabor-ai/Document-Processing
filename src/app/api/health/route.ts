import { NextResponse } from "next/server";
import { AI_PROVIDER_ENV_KEYS } from "@/lib/ai/config";

export async function GET() {
  const timestamp = new Date().toISOString();
  const hasOpenAI = Boolean(process.env[AI_PROVIDER_ENV_KEYS.openai]);
  const hasGemini = Boolean(process.env[AI_PROVIDER_ENV_KEYS.gemini]);
  const aiReady = hasOpenAI || hasGemini;
  return NextResponse.json({
    status: "ok",
    timestamp,
    aiConfigured: aiReady,
  });
}
