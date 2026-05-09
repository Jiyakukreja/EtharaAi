import { SectionHeading } from '@/components/ui/section-heading';
import { MemberCard } from '@/components/team/member-card';
import { mockTeam } from '@/utils/mockData';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function TeamPage() {
  return (
    <div className="space-y-8">
      <SectionHeading title="Team" description="Members, roles, and activity status in one place." />
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Team activity</CardTitle>
            <CardDescription>Invite members and keep status visible across the workspace.</CardDescription>
          </div>
        </CardHeader>
        <div className="grid gap-4">
          {mockTeam.map(member => <MemberCard key={member.id} member={member} />)}
        </div>
      </Card>
    </div>
  );
}
