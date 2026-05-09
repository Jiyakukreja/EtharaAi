import { useParams } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/section-heading';
import { mockProjects, mockTasks } from '@/utils/mockData';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KanbanBoard } from '@/components/tasks/kanban-board';

export function ProjectDetailsPage() {
  const { id } = useParams();
  const project = mockProjects.find(item => item._id === id) ?? mockProjects[0];
  const tasks = mockTasks.filter(task => task.projectId === project._id);

  return (
    <div className="space-y-8">
      <SectionHeading title={project.title} description={project.description} />
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Project overview</CardTitle>
              <CardDescription>Progress, milestones, and task flow for this workspace.</CardDescription>
            </div>
          </CardHeader>
          <div className="space-y-4">
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${project.progress}%` }} />
            </div>
            <p className="text-sm text-fg/65">{tasks.length} tasks in this project, with collaboration across {project.members.length} members.</p>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Deadline</CardTitle>
              <CardDescription>{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No deadline set'}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
      <KanbanBoard />
    </div>
  );
}
