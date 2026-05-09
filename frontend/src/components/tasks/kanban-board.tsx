import { DndContext, PointerSensor, useDroppable, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { TaskCard } from './task-card';
import type { Task, TaskStatus } from '@/types';
import { mockTasks } from '@/utils/mockData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';

const columns: TaskStatus[] = ['todo', 'in-progress', 'review', 'completed'];
const labels: Record<TaskStatus, string> = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  review: 'Review',
  completed: 'Completed'
};

export function KanbanBoard({
  tasks: incomingTasks,
  onTasksChange
}: {
  tasks?: Task[];
  onTasksChange?: (tasks: Task[]) => void;
}) {
  const [tasks, setTasks] = useState<Task[]>(incomingTasks ?? mockTasks);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  useEffect(() => {
    if (incomingTasks) {
      setTasks(incomingTasks);
    }
  }, [incomingTasks]);

  const grouped = useMemo(
    () => Object.fromEntries(columns.map(status => [status, tasks.filter(task => task.status === status)])),
    [tasks]
  ) as Record<TaskStatus, Task[]>;

  function onDragEnd(event: DragEndEvent) {
    if (!event.over) return;
    const taskId = String(event.active.id);
    const status = event.over.id as TaskStatus;
    setTasks(current => {
      const nextTasks = current.map(task => (task._id === taskId ? { ...task, status } : task));
      onTasksChange?.(nextTasks);
      return nextTasks;
    });
  }

  function DroppableColumn({ status, children }: { status: TaskStatus; children: ReactNode }) {
    const { setNodeRef, isOver } = useDroppable({ id: status });
    return (
      <div ref={setNodeRef} className={cn('min-h-[420px] rounded-[1.75rem] border border-dashed border-border/70 bg-muted/20 p-3 transition-colors', isOver && 'border-primary bg-primary/5')}>
        {children}
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="grid gap-4 xl:grid-cols-4">
        {columns.map(status => (
          <div key={status} className="space-y-4">
            <Card className="bg-muted/30 p-4">
              <CardHeader className="mb-0 p-0">
                <CardTitle className="text-base">{labels[status]}</CardTitle>
              </CardHeader>
            </Card>
            <DroppableColumn status={status}>
              {grouped[status].map(task => (
                <div key={task._id} id={task._id}>
                  <TaskCard task={task} />
                </div>
              ))}
            </DroppableColumn>
          </div>
        ))}
      </div>
    </DndContext>
  );
}
