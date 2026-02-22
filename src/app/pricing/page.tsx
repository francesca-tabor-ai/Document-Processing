import { MarketingHeader } from "@/components/layout/MarketingHeader";

export const metadata = {
  title: "Pricing — OptiFlowAI",
  description:
    "Simple, transparent pricing for individuals, teams, and enterprises. Scale document intelligence without scaling cost.",
};

const tiers = [
  {
    name: "Individual",
    description: "For solos and freelancers processing documents on their own",
    price: { monthly: 29, annual: 290 },
    annualNote: "Save 2 months",
    features: [
      "1,000 documents/month",
      "AI classification & summarization",
      "Confidence scores & overrides",
      "Basic audit log (30 days)",
      "Email support",
    ],
    cta: "Start free trial",
    href: "/dashboard",
    highlighted: false,
  },
  {
    name: "Team",
    description: "For growing teams who need collaboration and governance",
    price: { monthly: 99, annual: 990 },
    annualNote: "Save 2 months",
    features: [
      "10,000 documents/month",
      "Everything in Individual",
      "Role-based access (RBAC)",
      "Approval workflows",
      "Audit log (1 year retention)",
      "SSO (SAML, Azure AD, Okta)",
      "Priority support",
      "Dedicated success manager",
    ],
    cta: "Start free trial",
    href: "/dashboard",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with high volume and strict compliance",
    price: { custom: true },
    features: [
      "Unlimited documents",
      "Everything in Team",
      "Custom workflows & integrations",
      "SLA guarantees",
      "Unlimited audit retention",
      "On-prem / private cloud options",
      "24/7 dedicated support",
      "Custom AI model training",
    ],
    cta: "Contact sales",
    href: "mailto:sales@optiflowai.com",
    highlighted: false,
  },
];

function PricingCard({ tier }: { tier: (typeof tiers)[0] }) {
  return (
    <article
      className={`card p-8 flex flex-col ${
        tier.highlighted ? "ring-2 ring-primary shadow-medium" : ""
      }`}
    >
      {tier.highlighted && (
        <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Most popular
        </span>
      )}
      <h3 className="text-xl font-bold text-primary">{tier.name}</h3>
      <p className="mt-2 text-sm text-grey-600 leading-relaxed">
        {tier.description}
      </p>
      <div className="mt-6">
        {tier.price.custom ? (
          <>
            <p className="text-2xl font-bold text-primary">Custom pricing</p>
            <p className="mt-1 text-sm text-grey-500">
              Volume-based. Scales with your needs.
            </p>
          </>
        ) : (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tabular-nums text-primary">
                ${tier.price.monthly}
              </span>
              <span className="text-grey-500">/month</span>
            </div>
            <p className="mt-2 text-sm text-grey-500">
              or ${tier.price.annual}/year{" "}
              <span className="text-primary font-medium">({tier.annualNote})</span>
            </p>
          </>
        )}
      </div>
      <ul className="mt-8 flex-1 space-y-3 text-sm text-grey-700">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-primary" aria-hidden>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={tier.href}
        className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-medium transition-all ${
          tier.highlighted
            ? "btn-primary"
            : "btn-secondary"
        }`}
      >
        {tier.cta}
      </a>
    </article>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-grey-500">
            Pricing
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-grey-600 leading-relaxed">
            Scale document intelligence without scaling cost. Start free, upgrade when you need more.
          </p>
        </div>

        {/* Scaling functionality */}
        <div className="mb-12 rounded-xl border border-grey-200 bg-grey-50 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-primary mb-2">
            How usage scales
          </h2>
          <p className="text-grey-600 text-sm leading-relaxed mb-4">
            Document limits are per billing cycle. Overage packs available for Team. Enterprise includes custom volume agreements.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div className="rounded-lg bg-white p-4 border border-grey-200">
              <span className="font-semibold text-primary">Individual</span>
              <p className="mt-1 text-grey-600">1K docs → add blocks of 500 at $15/mo</p>
            </div>
            <div className="rounded-lg bg-white p-4 border border-grey-200">
              <span className="font-semibold text-primary">Team</span>
              <p className="mt-1 text-grey-600">10K docs → add blocks of 5K at $40/mo</p>
            </div>
            <div className="rounded-lg bg-white p-4 border border-grey-200">
              <span className="font-semibold text-primary">Enterprise</span>
              <p className="mt-1 text-grey-600">Unlimited with custom SLA & volume tiers</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-grey-500">
          All plans include a 14-day free trial. No credit card required.
        </p>

        <footer className="mt-20 border-t border-grey-200 pt-12 text-sm text-grey-600">
          <a href="/" className="hover:text-primary transition-colors">
            ← Back to home
          </a>
        </footer>
      </main>
    </div>
  );
}
