import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { day: 'Mon', value: 34 },
  { day: 'Tue', value: 48 },
  { day: 'Wed', value: 54 },
  { day: 'Thu', value: 72 },
  { day: 'Fri', value: 66 },
  { day: 'Sat', value: 80 },
  { day: 'Sun', value: 77 }
];

export function ProductivityChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <CardTitle>Productivity trend</CardTitle>
          <CardDescription>Weekly completion momentum across the team.</CardDescription>
        </div>
      </CardHeader>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="productivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#7c3aed" fill="url(#productivity)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
