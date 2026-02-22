"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h1 className="mb-2 text-2xl font-bold text-primary">Profile</h1>
      <p className="mb-8 text-grey-600">
        Manage your account and preferences.
      </p>
      <Card className="max-w-xl">
        <CardHeader>
          <h2 className="text-lg font-semibold text-primary">
            Personal information
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Name"
            defaultValue={user?.name}
            placeholder="Your name"
          />
          <Input
            label="Email"
            type="email"
            defaultValue={user?.email}
            placeholder="you@example.com"
            disabled
          />
          <p className="text-sm text-grey-500">
            Role: <span className="font-medium text-primary">{user?.role}</span>
          </p>
          <Button variant="secondary">Save changes</Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
