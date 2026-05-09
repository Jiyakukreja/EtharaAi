import { Circle, Mail } from 'lucide-react';
import type { User } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function MemberCard({ member }: { member: User }) {
  return (
    <Card className="flex items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-4">
        <Avatar name={member.name} />
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{member.name}</h4>
            <Badge className="bg-muted/70 text-fg/70">{member.role}</Badge>
          </div>
          <p className="mt-1 text-sm text-fg/60">{member.team}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-fg/55"><Mail className="h-3.5 w-3.5" /> {member.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-fg/60">
        <Circle className={`h-3 w-3 ${member.status === 'online' ? 'fill-emerald-400 text-emerald-400' : member.status === 'away' ? 'fill-amber-400 text-amber-400' : 'fill-zinc-400 text-zinc-400'}`} />
        {member.status}
      </div>
    </Card>
  );
}
