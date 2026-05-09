import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/projects/project-card';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { createProject, fetchProjects } from '@/services/projects';
import type { Project } from '@/types';
import { mockProjects } from '@/utils/mockData';
import { useAuthStore } from '@/store/authStore';

const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional().default(''),
  color: z.string().optional().default('#7c3aed'),
  deadline: z.string().optional().default('')
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export function ProjectsPage() {
  const user = useAuthStore(state => state.user);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { title: '', description: '', color: '#7c3aed', deadline: '' }
  });

  useEffect(() => {
    let active = true;
    fetchProjects()
      .then(({ projects }) => {
        if (active && Array.isArray(projects)) {
          setProjects(projects);
        }
      })
      .catch(() => {
        if (active) setProjects(mockProjects);
      });

    return () => {
      active = false;
    };
  }, []);

  async function onSubmit(values: ProjectFormValues) {
    if (!isAdmin) {
      toast({ title: 'Admin only', description: 'Only admins can create projects.' });
      return;
    }

    setLoading(true);
    try {
      const { project } = await createProject({
        title: values.title,
        description: values.description ?? '',
        color: values.color ?? '#7c3aed',
        deadline: values.deadline || undefined,
        members: []
      });
      setProjects(current => [project, ...current]);
      form.reset({ title: '', description: '', color: '#7c3aed', deadline: '' });
      toast({ title: 'Project created', description: `${project.title} is now live in your workspace.` });
    } catch (error) {
      toast({ title: 'Could not create project', description: error instanceof Error ? error.message : 'Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <SectionHeading title="Projects" description="Create, organize, and measure work across your team." />
        <Card className="w-full max-w-2xl p-4">
          <form className="grid gap-3 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
            <Input placeholder="Project title" {...form.register('title')} />
            <Input placeholder="Accent color" {...form.register('color')} />
            <Input className="md:col-span-2" placeholder="Description" {...form.register('description')} />
            <Input type="date" {...form.register('deadline')} />
            <div className="flex items-center justify-end gap-3 md:col-span-1 md:justify-end">
              {!isAdmin ? <span className="text-xs text-fg/55">Admin access required to create.</span> : null}
              <Button type="submit" className="gap-2" disabled={loading || !isAdmin}>
                <Plus className="h-4 w-4" /> {loading ? 'Creating...' : 'New project'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-border/70 bg-muted/30 p-8 text-sm text-fg/60">
          No projects yet. Create your first project from the form above.
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
