import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui";

export default function AuditPage() {
  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-primary">Audit log</h1>
      <p className="mb-8 text-grey-600">
        Immutable audit trail. (Viewer and export to be built.)
      </p>
      <Card>
        <CardContent className="py-12 text-center text-grey-500">
          Audit log viewer and compliance export — coming next.
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
