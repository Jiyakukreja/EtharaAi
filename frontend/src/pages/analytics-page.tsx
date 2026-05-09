import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const taskStatus = [
  { name: 'Completed', value: 58, color: '#22c55e' },
  { name: 'In Progress', value: 24, color: '#0ea5e9' },
  { name: 'Review', value: 12, color: '#f59e0b' },
  { name: 'Todo', value: 6, color: '#8b5cf6' }
];

const weekly = [
  { week: 'W1', completed: 12, overdue: 4 },
  { week: 'W2', completed: 16, overdue: 3 },
  { week: 'W3', completed: 18, overdue: 2 },
  { week: 'W4', completed: 24, overdue: 1 }
];

export function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <SectionHeading title="Analytics" description="Completion rate, weekly progress, and overdue stats with animated charting." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Task completion mix</CardTitle>
              <CardDescription>Status distribution across the workspace.</CardDescription>
            </div>
          </CardHeader>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={taskStatus} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={4}>
                  {taskStatus.map(entry => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Weekly progress</CardTitle>
              <CardDescription>Completion versus overdue work.</CardDescription>
            </div>
          </CardHeader>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={3} />
                <Line type="monotone" dataKey="overdue" stroke="#f97316" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
