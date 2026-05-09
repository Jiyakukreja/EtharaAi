import { SectionHeading } from '@/components/ui/section-heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <SectionHeading title="Settings" description="Manage appearance, notifications, and workspace preferences." />
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Toggle your preferred workspace defaults.</CardDescription>
          </div>
        </CardHeader>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Dark mode</Button>
          <Button variant="outline">Email alerts</Button>
          <Button variant="outline">Compact sidebar</Button>
        </div>
      </Card>
    </div>
  );
}
