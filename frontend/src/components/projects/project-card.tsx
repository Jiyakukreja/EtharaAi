import { motion } from 'framer-motion';
import { CalendarDays, Users2 } from 'lucide-react';
import type { Project } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDeadline } from '@/utils/format';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }}>
      <Card className="relative overflow-hidden border border-white/10 p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/0" />
        <div className="relative space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-1 text-sm text-fg/60">{project.description}</p>
            </div>
            <Badge className="border-0 bg-primary/15 text-primary">{project.progress}%</Badge>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${project.progress}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs text-fg/60">
            <div className="flex items-center gap-1.5">
              <Users2 className="h-4 w-4" />
              {project.members.length} members
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDeadline(project.deadline)}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
