import { motion } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, CalendarClock, Flag } from 'lucide-react';
import type { Task } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';

const priorityColors: Record<string, string> = {
  low: 'bg-emerald-500/15 text-emerald-400',
  medium: 'bg-sky-500/15 text-sky-400',
  high: 'bg-amber-500/15 text-amber-400',
  urgent: 'bg-rose-500/15 text-rose-400'
};

export function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task._id });

  return (
    <motion.div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="cursor-grab active:cursor-grabbing"
      {...listeners}
      {...attributes}
    >
      <Card className={cn('space-y-4 border border-white/10 p-4', isDragging && 'opacity-60')}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-fg/50"><GripVertical className="h-4 w-4" /></div>
          <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
        </div>
        <div>
          <h4 className="font-semibold">{task.title}</h4>
          <p className="mt-1 text-sm text-fg/60">{task.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {task.labels?.map(label => (
            <Badge key={label} className="bg-muted/70 text-fg/70">#{label}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-fg/60">
          <span className="flex items-center gap-1.5"><Flag className="h-4 w-4" /> {task.status}</span>
          <span className="flex items-center gap-1.5"><CalendarClock className="h-4 w-4" /> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
        </div>
      </Card>
    </motion.div>
  );
}
