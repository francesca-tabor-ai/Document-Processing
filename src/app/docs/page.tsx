export const metadata = {
  title: "Documentation — OptiFlowAI",
  description:
    "Platform overview, getting started, and guides for OptiFlowAI document processing.",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-grey-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <nav className="flex items-center justify-between">
            <a
              href="/"
              className="text-xl font-semibold text-primary hover:opacity-90 transition-opacity"
            >
              OptiFlowAI™
            </a>
            <div className="flex items-center gap-6 text-sm text-grey-600">
              <a href="/" className="hover:text-primary transition-colors">
                Product
              </a>
              <a
                href="/docs"
                className="font-medium text-primary"
                aria-current="page"
              >
                Docs
              </a>
              <a href="/dashboard" className="hover:text-primary transition-colors">
                Sign in
              </a>
              <a
                href="/dashboard"
                className="btn-primary rounded-md px-4 py-2 text-sm"
              >
                Get started
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-16">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-grey-500">
            Documentation
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            OptiFlowAI™ documentation
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-grey-600 leading-relaxed">
            Everything you need to understand, deploy, and use the platform for
            intelligent document processing.
          </p>
        </div>

        <nav className="mb-16 border-b border-grey-200 pb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-grey-500 mb-4">
            On this page
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-grey-600">
            <li>
              <a href="#overview" className="hover:text-primary transition-colors">
                Overview
              </a>
            </li>
            <li>
              <a href="#why-optiflowai" className="hover:text-primary transition-colors">
                Why OptiFlowAI?
              </a>
            </li>
            <li>
              <a href="#getting-started" className="hover:text-primary transition-colors">
                Getting started
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-primary transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#deployment" className="hover:text-primary transition-colors">
                Deployment
              </a>
            </li>
          </ul>
        </nav>

        <article className="space-y-20">
          <section id="overview">
            <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl mb-4">
              Platform overview
            </h2>
            <p className="text-grey-700 leading-relaxed mb-4">
              <strong>OptiFlowAI™</strong> is an intelligent document processing
              platform that turns high-volume document workflows into a
              controlled, auditable, and efficient process. Built for teams who
              need to classify, understand, and act on critical documents—from
              NDAs and contracts to financial statements and pitchbooks—without
              sacrificing accuracy or compliance.
            </p>
            <p className="text-grey-700 leading-relaxed">
              OptiFlowAI is designed for organizations that need{" "}
              <strong>speed, clarity, and control</strong> in document-heavy
              processes—so you can move faster without moving blindly.
            </p>
          </section>

          <section id="why-optiflowai">
            <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl mb-6">
              Why OptiFlowAI?
            </h2>
            <ul className="space-y-6">
              <li className="card p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  AI that works with you, not instead of you
                </h3>
                <p className="text-grey-600 leading-relaxed">
                  Our AI handles classification, summarization, and data
                  extraction so your team can focus on judgment, review, and
                  decision-making. Every AI output is reviewable, overridable,
                  and backed by confidence scores.
                </p>
              </li>
              <li className="card p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  One place for documents and intelligence
                </h3>
                <p className="text-grey-600 leading-relaxed">
                  Upload PDFs, Word, Excel, presentations, and email; get
                  structured insights, risk flags, and summaries in a single
                  workspace. No more switching between tools to find what
                  matters.
                </p>
              </li>
              <li className="card p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Built for governance
                </h3>
                <p className="text-grey-600 leading-relaxed">
                  Role-based access, immutable audit logs, and compliance-ready
                  exports mean you can scale document intelligence without
                  scaling risk. Support for SSO (SAML 2.0, Azure AD, Okta) fits
                  into your existing security posture.
                </p>
              </li>
              <li className="card p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Workflows that adapt
                </h3>
                <p className="text-grey-600 leading-relaxed">
                  Design workflows with approval gates and conditional logic,
                  track status in real time, and keep everyone aligned from
                  upload to final decision.
                </p>
              </li>
            </ul>
          </section>

          <section id="getting-started">
            <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl mb-4">
              Getting started
            </h2>
            <p className="text-grey-700 leading-relaxed mb-6">
              To use OptiFlowAI, sign in or create an account, then head to the
              dashboard. From there you can upload documents, configure
              workflows, and review AI-generated insights. For local development
              or self-hosted deployment, see the Deployment section below.
            </p>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Quick links
              </h3>
              <ul className="space-y-2 text-grey-600">
                <li>
                  <a href="/dashboard" className="text-primary hover:underline font-medium">
                    Dashboard
                  </a>{" "}
                  — Metrics and document overview
                </li>
                <li>
                  <a href="/documents" className="text-primary hover:underline font-medium">
                    Documents
                  </a>{" "}
                  — Upload and manage documents
                </li>
                <li>
                  <a href="/workflows" className="text-primary hover:underline font-medium">
                    Workflows
                  </a>{" "}
                  — Configure processing workflows
                </li>
                <li>
                  <a href="/review" className="text-primary hover:underline font-medium">
                    Review
                  </a>{" "}
                  — Human review and approval
                </li>
                <li>
                  <a href="/settings" className="text-primary hover:underline font-medium">
                    Settings
                  </a>{" "}
                  — Account and integration settings
                </li>
              </ul>
            </div>
          </section>

          <section id="features">
            <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl mb-6">
              Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="card p-6">
                <p className="text-sm font-medium text-grey-500 mb-1">
                  Document intelligence
                </p>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Classification, summarization, extraction
                </h3>
                <p className="text-grey-600 leading-relaxed text-sm">
                  AI-powered classification, summarization, and data extraction
                  with confidence scores. Supports contracts, financial docs, and
                  more.
                </p>
              </div>
              <div className="card p-6">
                <p className="text-sm font-medium text-grey-500 mb-1">
                  Human review
                </p>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Side-by-side viewer and approvals
                </h3>
                <p className="text-grey-600 leading-relaxed text-sm">
                  Review and override AI outputs with annotations and approval
                  workflows. Every change is audit-ready.
                </p>
              </div>
              <div className="card p-6">
                <p className="text-sm font-medium text-grey-500 mb-1">
                  Governance
                </p>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  RBAC, audit logs, SSO
                </h3>
                <p className="text-grey-600 leading-relaxed text-sm">
                  Role-based access control, immutable logs, and SSO (SAML 2.0,
                  Azure AD, Okta). SOC2-aligned practices.
                </p>
              </div>
              <div className="card p-6">
                <p className="text-sm font-medium text-grey-500 mb-1">
                  Workflows
                </p>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Approval gates and conditional logic
                </h3>
                <p className="text-grey-600 leading-relaxed text-sm">
                  Design workflows with approval gates, track status in real
                  time, and keep teams aligned from upload to decision.
                </p>
              </div>
            </div>
          </section>

          <section id="deployment">
            <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl mb-4">
              Deployment
            </h2>
            <p className="text-grey-700 leading-relaxed mb-6">
              OptiFlowAI can be deployed on Railway with PostgreSQL for a
              fully managed backend. Follow these steps to get running in the
              cloud.
            </p>
            <ol className="list-decimal list-inside space-y-4 text-grey-700 leading-relaxed">
              <li>
                Create a project on Railway and deploy this repository (GitHub
                connect or CLI).
              </li>
              <li>
                Add <strong>PostgreSQL</strong> from the Railway dashboard
                (<strong>+ New</strong> → <strong>Database</strong> →{" "}
                <strong>PostgreSQL</strong>). Railway will set{" "}
                <code className="rounded bg-grey-100 px-1.5 py-0.5 text-sm font-mono">
                  DATABASE_URL
                </code>{" "}
                for your service.
              </li>
              <li>
                Run the schema once: execute{" "}
                <code className="rounded bg-grey-100 px-1.5 py-0.5 text-sm font-mono">
                  src/lib/db/schema.sql
                </code>{" "}
                against your Postgres instance (Railway Query tab or{" "}
                <code className="rounded bg-grey-100 px-1.5 py-0.5 text-sm font-mono">
                  psql
                </code>
                ).
              </li>
              <li>
                Add your AI keys in the service <strong>Variables</strong>:{" "}
                <code className="rounded bg-grey-100 px-1.5 py-0.5 text-sm font-mono">
                  OPENAI_API_KEY
                </code>{" "}
                and/or{" "}
                <code className="rounded bg-grey-100 px-1.5 py-0.5 text-sm font-mono">
                  GEMINI_API_KEY
                </code>
                .
              </li>
            </ol>
            <p className="mt-6 text-grey-600 leading-relaxed">
              For step-by-step instructions and CLI options, see{" "}
              <strong>RAILWAY.md</strong> in the project repository.
            </p>
          </section>
        </article>

        <footer className="mt-20 border-t border-grey-200 pt-12 text-sm text-grey-600">
          <p className="mb-4">
            © OptiFlowAI. Trustworthy, modern, and built for the long term.
          </p>
          <a href="/" className="hover:text-primary transition-colors">
            Back to home
          </a>
        </footer>
      </main>
    </div>
  );
}
