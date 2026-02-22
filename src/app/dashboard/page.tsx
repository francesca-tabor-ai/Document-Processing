import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { Badge } from "@/components/ui/Badge";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-primary">Dashboard</h1>
      <p className="mb-8 text-grey-600">
        Key metrics and document processing overview.
      </p>
      <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Documents processed", value: "1,247", trend: "+12%" },
          { label: "Pending review", value: "23", trend: "3 high" },
          { label: "Success rate", value: "99.2%", trend: "+0.1%" },
          { label: "Avg. processing time", value: "4.2s", trend: "-0.3s" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <p className="text-sm font-medium text-grey-500">{stat.label}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-semibold tabular-nums text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-grey-500">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-primary">
              Recent activity
            </h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { doc: "Contract_NDA_2024.pdf", action: "Classified", status: "success" as const },
                { doc: "Q3_Financials.xlsx", action: "Pending review", status: "warning" as const },
                { doc: "Pitchbook_Acme.pptx", action: "Extraction complete", status: "info" as const },
              ].map((item) => (
                <li
                  key={item.doc}
                  className="flex items-center justify-between border-b border-grey-100 pb-4 last:border-0 last:pb-0"
                >
                  <span className="font-medium text-primary">{item.doc}</span>
                  <Badge variant={item.status}>{item.action}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
