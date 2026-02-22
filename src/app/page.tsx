import { MarketingHeader } from "@/components/layout/MarketingHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero: Customer + Pain Point + Solution */}
        <section className="pt-24 pb-30 md:pt-32 md:pb-40">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-grey-500">
              For legal, finance & compliance teams
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl tracking-tight">
              Stop drowning in documents. Start moving with confidence.
            </h1>
            <p className="mb-8 max-w-2xl text-lg font-normal text-grey-700 leading-relaxed">
              Your team wastes hours classifying contracts, chasing down terms, and hunting for risk. Manual review is slow, error-prone, and impossible to audit. You need to move fast—but you can&apos;t afford to miss what matters.
            </p>
            <p className="mb-10 max-w-2xl text-lg font-semibold text-primary leading-relaxed">
              OptiFlowAI gives you AI-powered classification, extraction, and summaries—with human review, confidence scores, and full audit trails. One platform. Real intelligence. Zero guesswork.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/dashboard"
                className="btn-primary rounded-lg px-6 py-3 text-base"
              >
                Start free trial
              </a>
              <a
                href="/pricing"
                className="btn-secondary rounded-lg px-6 py-3 text-base"
              >
                View pricing
              </a>
            </div>
          </div>
          {/* Gradient strip — accent only */}
          <div
            className="mt-22 h-1.5 w-full max-w-md rounded-full bg-gradient-signature opacity-90 transition-smooth"
            aria-hidden
          />
        </section>

        {/* Pain points + How we solve them */}
        <section className="border-t border-grey-200 py-22">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-primary md:text-3xl">
            The problem you know
          </h2>
          <p className="mb-12 max-w-2xl text-grey-600 leading-relaxed">
            Document-heavy teams face the same bottlenecks every day:
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { pain: "Hours lost to manual classification and data entry", solution: "AI classifies and extracts in seconds; you review and approve.", stat: "70%", label: "Time saved" },
              { pain: "No single source of truth—documents scattered across tools", solution: "One workspace for uploads, insights, risk flags, and approvals.", stat: "1 platform", label: "One place" },
              { pain: "Audit nightmares: who changed what, when?", solution: "Immutable logs, role-based access, and compliance-ready exports.", stat: "100%", label: "Auditable" },
            ].map((item) => (
              <article key={item.label} className="card p-6">
                <p className="text-sm font-medium text-grey-500">{item.label}</p>
                <p className="mt-1 font-semibold tabular-nums text-primary">
                  {item.stat}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-primary">
                  {item.pain}
                </h3>
                <p className="mt-2 text-grey-600 leading-relaxed">
                  <span className="font-medium text-primary">OptiFlowAI:</span> {item.solution}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Solution highlights */}
        <section className="border-t border-grey-200 py-22">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-primary md:text-3xl">
            Built for speed, clarity, and control
          </h2>
          <p className="mb-12 max-w-2xl text-grey-600 leading-relaxed">
            AI that works with you, not instead of you. Every output is reviewable, overridable, and backed by confidence scores.
          </p>
          <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Document intelligence",
                desc: "Classification, summarization, and extraction with confidence scores.",
                stat: "99.2%",
                label: "Accuracy",
              },
              {
                title: "Human review",
                desc: "Side-by-side viewer, annotations, and approval workflows.",
                stat: "Audit-ready",
                label: "Every change",
              },
              {
                title: "Governance",
                desc: "RBAC, immutable logs, and SSO. No surprises.",
                stat: "SOC2",
                label: "Aligned",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="card p-6"
              >
                <p className="text-sm font-medium text-grey-500">{card.label}</p>
                <p className="mt-1 font-semibold tabular-nums text-primary">
                  {card.stat}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 text-grey-600 leading-relaxed">{card.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* One platform CTA block */}
        <section className="rounded-2xl bg-gradient-signature-soft py-22 px-8 md:py-30 md:px-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-primary md:text-3xl">
            One platform. Documents and intelligence together.
          </h2>
          <p className="mb-8 max-w-2xl text-grey-700 leading-relaxed">
            Upload PDFs, Word, Excel, and email. Get structured insights, risk
            flags, and summaries in a single workspace—with role-based access
            and full audit logs so you can scale without scaling risk.
          </p>
          <a
            href="/dashboard"
            className="btn-primary inline-block rounded-lg px-6 py-3 text-base"
          >
            Get started free
          </a>
        </section>

        <footer className="border-t border-grey-200 py-12 text-sm text-grey-600">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <p>© OptiFlowAI. Trustworthy, modern, and built for the long term.</p>
            <div className="flex gap-6">
              <a href="/pricing" className="hover:text-primary transition-colors">Pricing</a>
              <a href="/case-studies" className="hover:text-primary transition-colors">Case Studies</a>
              <a href="/docs" className="hover:text-primary transition-colors">Docs</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
