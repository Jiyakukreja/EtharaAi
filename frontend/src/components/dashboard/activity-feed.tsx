import { Clock3 } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Activity } from '@/types';
import { mockActivities } from '@/utils/mockData';

export function ActivityFeed({ activities = mockActivities }: { activities?: Activity[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <CardTitle>Team activity</CardTitle>
          <CardDescription>Recent updates from your workspace. Projects and tasks create activity automatically.</CardDescription>
        </div>
      </CardHeader>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 p-6 text-sm text-fg/60">
            No activity yet. Create a project or task to see the timeline update.
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="flex gap-3 rounded-2xl border border-border/70 bg-muted/50 p-4">
              <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                <Clock3 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="mt-1 text-xs text-fg/55">{new Date(activity.createdAt ?? Date.now()).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
