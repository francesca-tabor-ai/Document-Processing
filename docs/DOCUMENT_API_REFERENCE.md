# Document API & AI Processing Reference

Reference patterns for document management and AI processing (aligned with PROJECT_TODO).

## Document status values

Use these for document workflow states:

- `pending_review` – uploaded, not yet reviewed
- `approved` – reviewed and approved
- `rejected` – reviewed and rejected

(Optional: `uploaded`, `processing`, `queued` for pipeline stages.)

## Document API shape

- **List:** `GET /api/documents` → `{ documents: Document[] }` (or paginated).
- **Get:** `GET /api/documents/:id` → single document.
- **Create:** `POST /api/documents` body `{ title: string, content?: string }` (or multipart for file upload); store `uploadedBy` (user id), set `status: "pending_review"`.
- **Update:** `PUT /api/documents/:id` body `{ status?, classification?, extractedData?, summary? }` for AI results and review.
- **Logs:** `GET /api/documents/:id/logs` → audit entries for that document.

## AI processing flow

1. **Trigger:** `POST /api/documents/:id/process` (or run after upload).
2. **Provider order:** Use **OpenAI first**, then **Gemini** (e.g. as fallback). See `src/lib/ai/config.ts` for `AI_PROVIDER_ORDER`.
3. **Prompt:** Ask model for: `classification` (e.g. NDA, MSA, Financial Report), `summary` (2–3 sentences), `extractedData` (JSON: entities, dates, parties, terms).
4. **Storage:** Update document with AI fields; write audit log entry (e.g. "AI Analysis Completed").
5. **Response:** Return success; client can refetch document or poll.

## Audit log

Per-document log entries: `documentId`, `userId`, `action` (e.g. "Uploaded Document", "Status changed to approved", "AI Analysis Completed"), `createdAt`. Use for compliance and activity feed.

## Types (TypeScript)

```ts
type DocumentStatus = "pending_review" | "approved" | "rejected";

interface Document {
  id: string;
  title: string;
  content?: string;
  status: DocumentStatus;
  classification?: string;
  extractedData?: Record<string, unknown>;
  summary?: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}
```

Adapt field names to match `src/lib/db/schema.sql` (e.g. `name` vs `title`, `owner_id` vs `uploadedBy`, UUIDs).
