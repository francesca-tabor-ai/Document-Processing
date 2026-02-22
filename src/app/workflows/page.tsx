import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui";

export default function WorkflowsPage() {
  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-primary">Workflows</h1>
      <p className="mb-8 text-grey-600">
        Workflow builder and execution status. (Placeholder.)
      </p>
      <Card>
        <CardContent className="py-12 text-center text-grey-500">
          Workflow automation and templates — coming next.
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
