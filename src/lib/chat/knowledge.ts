/**
 * Platform knowledge for the help chat: answers and prompt probes.
 */

export const PROMPT_PROBES = [
  "How do I upload a document?",
  "What file types are supported?",
  "What is the review workflow?",
  "Where do I see the audit log?",
  "What does the dashboard show?",
  "How do I manage workflows?",
] as const;

/** Keywords (lowercase) -> response. First matching entry wins. */
const KNOWLEDGE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["upload", "add document", "drag", "drop", "import", "file"],
    answer:
      "Go to **Documents** in the sidebar. You can drag and drop files onto the upload area or click to browse. Supported formats: PDF, Word (.doc, .docx), Excel (.xls, .xlsx), PowerPoint (.ppt, .pptx), and email (.eml). Each file can be up to 50MB.",
  },
  {
    keywords: ["file type", "format", "supported", "pdf", "word", "excel", "ppt", "email"],
    answer:
      "OptiFlowAI supports **PDF**, **Word** (.doc, .docx), **Excel** (.xls, .xlsx), **PowerPoint** (.ppt, .pptx), and **email** (.eml). Maximum file size is 50MB per document.",
  },
  {
    keywords: ["review", "human review", "approve", "pending review", "side-by-side"],
    answer:
      "The **Review** section (sidebar) is where you do human review. It will show documents side-by-side with AI suggestions so you can approve or correct extractions and classifications. The full document viewer and approval workflow is being built out.",
  },
  {
    keywords: ["audit", "audit log", "history", "compliance", "traceability"],
    answer:
      "Open **Audit log** in the sidebar to see a full record of actions and changes. This supports compliance and traceability—you can see who did what and when across document processing and reviews.",
  },
  {
    keywords: ["dashboard", "metrics", "overview", "stats", "processed", "success rate"],
    answer:
      "The **Dashboard** shows key metrics: documents processed, pending review count, success rate, and average processing time. The recent activity list shows the latest document actions (e.g. classified, pending review, extraction complete).",
  },
  {
    keywords: ["workflow", "workflows", "automation", "pipeline"],
    answer:
      "Use **Workflows** in the sidebar to define and manage document processing pipelines. You can configure automation for classification, extraction, and routing. Check the Workflows page for the current setup.",
  },
  {
    keywords: ["settings", "profile", "account", "preferences"],
    answer:
      "**Settings** (sidebar) holds app and integration preferences. **Profile** (sidebar or header) is where you manage your account details and view your info.",
  },
  {
    keywords: ["documents", "library", "document list", "export"],
    answer:
      "The **Documents** page lists all your uploaded files with name, type, upload date, owner, and status. You can export the list as CSV or JSON from the buttons above the table.",
  },
  {
    keywords: ["optiflow", "platform", "what is", "about", "help"],
    answer:
      "**OptiFlowAI** is an intelligent document processing platform. It handles document classification, summarization, and extraction with human review and full auditability. Use the sidebar to go to Dashboard, Documents, Review, Workflows, Audit log, and Settings.",
  },
];

const FALLBACK =
  "I can answer questions about OptiFlowAI—uploading documents, the review workflow, audit log, dashboard, workflows, and settings. Try one of the suggested prompts above or ask in your own words.";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getReply(userMessage: string): string {
  const normalized = normalize(userMessage);
  if (!normalized) return "Type a question about the platform and I’ll try to help.";

  for (const { keywords, answer } of KNOWLEDGE) {
    if (keywords.some((k) => normalized.includes(k))) return answer;
  }

  return FALLBACK;
}
