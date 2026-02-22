import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-primary">Settings</h1>
      <p className="mb-8 text-grey-600">
        System and team settings. Admin only for some options.
      </p>
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-primary">General</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-grey-600">
              Organization name, timezone, and default preferences. (UI to be
              wired.)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-primary">SSO</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-grey-600">
              SAML 2.0, Azure AD, Okta integration. (Placeholder.)
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
