import { MarketingHeader } from "@/components/layout/MarketingHeader";

export const metadata = {
  title: "Case Studies — OptiFlowAI",
  description:
    "See how leading organizations use OptiFlowAI to accelerate document workflows and stay compliant.",
};

const logos = [
  "Acme Corp",
  "Northridge Legal",
  "Summit Financial",
  "Atlas Compliance",
  "Horizon Capital",
  "Venture Partners",
  "Stonebridge Advisors",
  "Meridian Legal",
  "Pacific Funds",
  "Cascade Investments",
];

const caseStudies = [
  {
    company: "Northridge Legal",
    industry: "Legal",
    quote: "We cut contract review time by 65%. OptiFlowAI surfaces key terms instantly, and our team focuses on negotiation instead of data entry.",
    author: "Sarah Chen",
    role: "VP of Operations",
    results: [
      { label: "Time saved", value: "65%" },
      { label: "Documents/month", value: "4,200" },
    ],
  },
  {
    company: "Summit Financial",
    industry: "Finance",
    quote: "Compliance was our bottleneck. With OptiFlowAI, every change is logged, every decision is traceable. SOC2 audit prep went from weeks to days.",
    author: "James Rivera",
    role: "Head of Compliance",
    results: [
      { label: "Audit prep time", value: "75% faster" },
      { label: "Docs processed", value: "12K+/mo" },
    ],
  },
  {
    company: "Atlas Compliance",
    industry: "Compliance",
    quote: "We process thousands of NDAs and vendor agreements. OptiFlowAI classifies and extracts in seconds—we just validate and approve. Game changer.",
    author: "Michelle Park",
    role: "Director of Document Operations",
    results: [
      { label: "Manual work reduced", value: "70%" },
      { label: "Accuracy", value: "99.2%" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-grey-500">
            Case Studies
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Trusted by teams who move fast
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-grey-600 leading-relaxed">
            See how legal, finance, and compliance teams use OptiFlowAI to process documents faster—without sacrificing accuracy or auditability.
          </p>
        </div>

        {/* Scrolling logos */}
        <section className="mb-22 overflow-hidden">
          <p className="mb-6 text-center text-sm font-medium text-grey-500 uppercase tracking-wider">
            Companies using OptiFlowAI
          </p>
          <div className="relative">
            <div className="scrolling-logos flex animate-scroll">
              {[...logos, ...logos].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="shrink-0 px-10 flex items-center justify-center"
                >
                  <span className="text-lg font-semibold text-grey-400 whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case study cards */}
        <section className="space-y-12">
          {caseStudies.map((cs) => (
            <article key={cs.company} className="card p-8 md:p-10">
              <p className="text-sm font-medium text-grey-500">{cs.industry}</p>
              <h2 className="mt-1 text-2xl font-bold text-primary">{cs.company}</h2>
              <blockquote className="mt-6 text-lg text-grey-700 leading-relaxed italic">
                &ldquo;{cs.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div>
                  <p className="font-semibold text-primary">{cs.author}</p>
                  <p className="text-sm text-grey-500">{cs.role}</p>
                </div>
                <div className="flex gap-6">
                  {cs.results.map((r) => (
                    <div key={r.label}>
                      <p className="font-semibold tabular-nums text-primary">{r.value}</p>
                      <p className="text-xs text-grey-500">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-22 rounded-2xl bg-gradient-signature-soft py-16 px-8 text-center">
          <h2 className="text-2xl font-bold text-primary">
            Ready to see results like these?
          </h2>
          <p className="mt-3 text-grey-700 max-w-xl mx-auto">
            Start your free trial. No credit card required.
          </p>
          <a
            href="/dashboard"
            className="btn-primary mt-6 inline-block rounded-lg px-6 py-3 text-base"
          >
            Get started
          </a>
        </section>

        <footer className="mt-20 border-t border-grey-200 pt-12 text-sm text-grey-600">
          <a href="/" className="hover:text-primary transition-colors">
            ← Back to home
          </a>
        </footer>
      </main>
    </div>
  );
}
