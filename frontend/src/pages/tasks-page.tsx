import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays, Table2, Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { mockTasks, mockProjects } from '@/utils/mockData';
import { KanbanBoard } from '@/components/tasks/kanban-board';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { createTask, fetchTasks } from '@/services/tasks';
import type { Project, Task } from '@/types';
import { useAuthStore } from '@/store/authStore';
import { fetchProjects } from '@/services/projects';

const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().default(''),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  dueDate: z.string().default(''),
  status: z.enum(['todo', 'in-progress', 'review', 'completed']),
  projectId: z.string().min(1),
  labels: z.string().default('')
});

type TaskFormValues = z.output<typeof taskSchema>;

export function TasksPage() {
  const user = useAuthStore(state => state.user);
  const isAdmin = user?.role === 'admin';
  const [view, setView] = useState<'board' | 'table' | 'calendar'>('board');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.input<typeof taskSchema>, undefined, z.output<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      status: 'todo',
      projectId: mockProjects[0]?._id ?? '',
      labels: ''
    }
  });

  useEffect(() => {
    let active = true;
    Promise.all([fetchTasks(), fetchProjects()])
      .then(([taskResponse, projectResponse]) => {
        if (!active) return;
        if (Array.isArray(taskResponse.tasks)) {
          setTasks(taskResponse.tasks);
        }
        if (Array.isArray(projectResponse.projects)) {
          setProjects(projectResponse.projects);
        }
      })
      .catch(() => {
        if (!active) return;
        setTasks(mockTasks);
        setProjects(mockProjects);
      });

    return () => {
      active = false;
    };
  }, []);

  const summary = useMemo(() => tasks.slice(0, 3), [tasks]);

  async function onSubmit(values: TaskFormValues) {
    if (!isAdmin) {
      toast({ title: 'Admin only', description: 'Only admins can create tasks.' });
      return;
    }

    setLoading(true);
    try {
      const { task } = await createTask({
        title: values.title,
        description: values.description ?? '',
        priority: values.priority,
        dueDate: values.dueDate || undefined,
        status: values.status,
        projectId: values.projectId,
        labels: values.labels
          ? values.labels
              .split(',')
              .map(label => label.trim())
              .filter(Boolean)
          : []
      });
      setTasks(current => [task, ...current]);
      form.reset({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        status: 'todo',
        projectId: projects[0]?._id ?? '',
        labels: ''
      });
      toast({ title: 'Task created', description: `${task.title} is now in your board.` });
    } catch (error) {
      toast({ title: 'Could not create task', description: error instanceof Error ? error.message : 'Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <SectionHeading title="Tasks" description="Track status across Kanban, table, and calendar views." />
        <Card className="w-full max-w-4xl p-4">
          <form className="grid gap-3 md:grid-cols-2 xl:grid-cols-4" onSubmit={form.handleSubmit(onSubmit)}>
            <Input placeholder="Task title" {...form.register('title')} />
            <Input placeholder="Description" {...form.register('description')} />
            <select className="flex h-11 w-full rounded-2xl border border-border bg-card/75 px-4 text-sm outline-none" {...form.register('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            <select className="flex h-11 w-full rounded-2xl border border-border bg-card/75 px-4 text-sm outline-none" {...form.register('status')}>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>
            <select className="flex h-11 w-full rounded-2xl border border-border bg-card/75 px-4 text-sm outline-none" {...form.register('projectId')}>
              {projects.map(project => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
            </select>
            <Input type="date" {...form.register('dueDate')} />
            <Input className="xl:col-span-2" placeholder="Labels, comma separated" {...form.register('labels')} />
            <div className="flex items-center justify-end gap-3 md:col-span-2 xl:col-span-4">
              {!isAdmin ? <span className="text-xs text-fg/55">Admin access required to create.</span> : null}
              <Button type="submit" className="gap-2" disabled={loading || !isAdmin}>
                <Plus className="h-4 w-4" /> {loading ? 'Creating...' : 'New task'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button variant={view === 'board' ? 'default' : 'outline'} onClick={() => setView('board')}>Board</Button>
        <Button variant={view === 'table' ? 'default' : 'outline'} onClick={() => setView('table')}><Table2 className="mr-2 h-4 w-4" />Table</Button>
        <Button variant={view === 'calendar' ? 'default' : 'outline'} onClick={() => setView('calendar')}><CalendarDays className="mr-2 h-4 w-4" />Calendar</Button>
      </div>

      {view === 'board' ? (
        <KanbanBoard tasks={tasks} onTasksChange={setTasks} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{view === 'table' ? 'Table view' : 'Calendar view'}</CardTitle>
          </CardHeader>
          <div className="grid gap-3">
            {summary.map(task => (
              <div key={task._id} className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 p-4">
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-fg/60">{task.description}</div>
                </div>
                <div className="text-sm text-fg/60">{task.status}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
