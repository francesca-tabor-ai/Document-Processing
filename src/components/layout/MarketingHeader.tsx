"use client";

export function MarketingHeader() {
  return (
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
            <a href="/" className="nav-link-hover hover:text-primary transition-colors">
              Product
            </a>
            <a href="/pricing" className="nav-link-hover hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="/case-studies" className="nav-link-hover hover:text-primary transition-colors">
              Case Studies
            </a>
            <a href="/docs" className="nav-link-hover hover:text-primary transition-colors">
              Docs
            </a>
            <a href="/dashboard" className="nav-link-hover hover:text-primary transition-colors">
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
  );
}
