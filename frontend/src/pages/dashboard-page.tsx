import { useEffect, useState } from 'react';
import { BarChart3, CheckCircle2, Clock3, TimerReset } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { StatCard } from '@/components/dashboard/stat-card';
import { ProductivityChart } from '@/components/dashboard/productivity-chart';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { ProjectCard } from '@/components/projects/project-card';
import { mockProjects } from '@/utils/mockData';
import { formatPercent } from '@/utils/format';
import type { Activity } from '@/types';
import { fetchActivityFeed } from '@/services/activity';

export function DashboardPage() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    let active = true;
    fetchActivityFeed()
      .then(({ activities }) => {
        if (active) setActivities(activities);
      })
      .catch(() => {
        if (active) setActivities([]);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <SectionHeading title="Dashboard" description="A focused command center for projects, team progress, and deadlines." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total tasks" value="148" delta="+12.4% from last week" icon={<BarChart3 className="h-5 w-5" />} />
        <StatCard title="Completed" value="96" delta="78% completion rate" accent="from-secondary to-accent" icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard title="Pending" value="38" delta="Need attention this week" accent="from-sky-500 to-cyan-400" icon={<Clock3 className="h-5 w-5" />} />
        <StatCard title="Overdue" value="4" delta="Deadline risk reduced by 60%" accent="from-rose-500 to-orange-400" icon={<TimerReset className="h-5 w-5" />} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <ProductivityChart />
        <ActivityFeed activities={activities} />
      </div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Recent projects</CardTitle>
            <CardDescription>High-signal projects with progress indicators and deadlines.</CardDescription>
          </div>
          <div className="text-sm text-fg/60">Average progress {formatPercent(55)}</div>
        </CardHeader>
        <div className="grid gap-4 xl:grid-cols-2">
          {mockProjects.map(project => <ProjectCard key={project._id} project={project} />)}
        </div>
      </Card>
    </div>
  );
}
