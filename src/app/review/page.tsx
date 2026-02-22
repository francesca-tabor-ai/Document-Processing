import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui";

export default function ReviewPage() {
  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-primary">Review</h1>
      <p className="mb-8 text-grey-600">
        Side-by-side document viewer and AI suggestions. (UI to be built.)
      </p>
      <Card>
        <CardContent className="py-12 text-center text-grey-500">
          Human review interface — document viewer and approval workflow
          coming next.
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
