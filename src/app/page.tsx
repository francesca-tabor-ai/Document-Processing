export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero: gradient used sparingly, lots of white space */}
      <header className="border-b border-grey-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <nav className="flex items-center justify-between">
            <span className="text-xl font-semibold text-primary">
              OptiFlowAI™
            </span>
            <div className="flex items-center gap-6 text-sm text-grey-600">
              <a href="#" className="hover:text-primary transition-colors">
                Product
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Docs
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Sign in
              </a>
              <a
                href="#"
                className="btn-primary rounded-md px-4 py-2 text-sm"
              >
                Get started
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero section — signature gradient as accent only */}
        <section className="pt-24 pb-30 md:pt-32 md:pb-40">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-grey-500">
              Intelligent document processing
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl">
              Speed, clarity, and control for document-heavy workflows.
            </h1>
            <p className="mb-10 max-w-2xl text-lg text-grey-700 leading-relaxed">
              Classify, summarize, and extract from contracts and financial
              documents with AI—then review, override, and approve with full
              audit trails. Serious infrastructure, without the intimidation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="btn-primary rounded-lg px-6 py-3 text-base"
              >
                Start free trial
              </a>
              <a
                href="#"
                className="btn-secondary rounded-lg px-6 py-3 text-base"
              >
                View documentation
              </a>
            </div>
          </div>
          {/* Gradient strip — accent, doesn't overwhelm */}
          <div
            className="mt-22 h-1.5 w-full max-w-md rounded-full bg-gradient-signature opacity-90"
            aria-hidden
          />
        </section>

        {/* UI showcase: cards, typography hierarchy, cool greys */}
        <section className="border-t border-grey-200 py-22">
          <h2 className="mb-3 text-2xl font-bold text-primary md:text-3xl">
            Built for developers and compliance teams.
          </h2>
          <p className="mb-12 max-w-2xl text-grey-600 leading-relaxed">
            Strong typographic hierarchy, rounded components, and a calm palette
            keep the focus on your data and workflows.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                className="card p-6 transition-shadow hover:shadow-medium"
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

        {/* Subtle gradient background block — expressive but minimal */}
        <section className="rounded-2xl bg-gradient-signature-soft py-22 px-8 md:py-30 md:px-16">
          <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
            One platform. Documents and intelligence together.
          </h2>
          <p className="max-w-2xl text-grey-700 leading-relaxed">
            Upload PDFs, Word, Excel, and email. Get structured insights, risk
            flags, and summaries in a single workspace—with role-based access
            and full audit logs so you can scale without scaling risk.
          </p>
        </section>

        <footer className="border-t border-grey-200 py-12 text-sm text-grey-600">
          <p>© OptiFlowAI. Trustworthy, modern, and built for the long term.</p>
        </footer>
      </main>
    </div>
  );
}
