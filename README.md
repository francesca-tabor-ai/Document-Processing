# OptiFlowAI™

## Platform Overview

**OptiFlowAI™** is an intelligent document processing platform that turns high-volume document workflows into a controlled, auditable, and efficient process. Built for teams who need to classify, understand, and act on critical documents—from NDAs and contracts to financial statements and pitchbooks—without sacrificing accuracy or compliance.

### Why OptiFlowAI?

- **AI that works with you, not instead of you.** Our AI handles classification, summarization, and data extraction so your team can focus on judgment, review, and decision-making. Every AI output is reviewable, overridable, and backed by confidence scores.
- **One place for documents and intelligence.** Upload PDFs, Word, Excel, presentations, and email; get structured insights, risk flags, and summaries in a single workspace. No more switching between tools to find what matters.
- **Built for governance.** Role-based access, immutable audit logs, and compliance-ready exports mean you can scale document intelligence without scaling risk. Support for SSO (SAML 2.0, Azure AD, Okta) fits into your existing security posture.
- **Workflows that adapt.** Design workflows with approval gates and conditional logic, track status in real time, and keep everyone aligned from upload to final decision.

OptiFlowAI™ is designed for organizations that need **speed, clarity, and control** in document-heavy processes—so you can move faster without moving blindly.

---

## Getting Started

*(Setup and development instructions will be added here.)*

### Deploy on Railway with PostgreSQL

To run OptiFlowAI on [Railway](https://railway.app) with a Postgres backend:

1. Create a project and deploy this repo (GitHub connect or CLI).
2. Add **PostgreSQL** from the Railway dashboard (**+ New** → **Database** → **PostgreSQL**). Railway will set `DATABASE_URL` for your service.
3. Run the schema once: execute `src/lib/db/schema.sql` against your Postgres instance (Railway Query tab or `psql`).
4. Add your AI keys in the service **Variables** (`OPENAI_API_KEY` and/or `GEMINI_API_KEY`).

See **[RAILWAY.md](./RAILWAY.md)** for step-by-step instructions and CLI options.

## License

*(To be defined.)*
