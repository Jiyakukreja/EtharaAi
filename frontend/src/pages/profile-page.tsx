import { SectionHeading } from '@/components/ui/section-heading';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { mockUser } from '@/utils/mockData';

export function ProfilePage() {
  return (
    <div className="space-y-8">
      <SectionHeading title="Profile" description="Customize identity, role, and workspace presence." />
      <Card>
        <CardHeader>
          <div>
            <CardTitle>{mockUser.name}</CardTitle>
            <CardDescription>{mockUser.email}</CardDescription>
          </div>
        </CardHeader>
        <div className="flex items-center gap-5">
          <Avatar name={mockUser.name} className="h-16 w-16 text-lg" />
          <div>
            <div className="text-sm text-fg/60">Role</div>
            <div className="font-medium capitalize">{mockUser.role}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
