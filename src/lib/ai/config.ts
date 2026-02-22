/**
 * AI provider order for document processing.
 * Use OpenAI first, then Gemini (e.g. as fallback).
 */
export const AI_PROVIDER_ORDER = ["openai", "gemini"] as const;

export type AIProvider = (typeof AI_PROVIDER_ORDER)[number];

/** Env var names per provider (for runtime key lookup). */
export const AI_PROVIDER_ENV_KEYS: Record<AIProvider, string> = {
  openai: "OPENAI_API_KEY",
  gemini: "GEMINI_API_KEY",
};
