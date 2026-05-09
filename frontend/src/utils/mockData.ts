import type { Activity, Project, Task, User } from '@/types';

export const mockUser: User = {
  id: 'u1',
  name: 'Ava Carter',
  email: 'ava@ethara.ai',
  role: 'admin',
  team: 'Core Product',
  status: 'online'
};

export const mockTeam: User[] = [
  mockUser,
  { id: 'u2', name: 'Noah Lee', email: 'noah@ethara.ai', role: 'member', team: 'Design', status: 'away' },
  { id: 'u3', name: 'Maya Chen', email: 'maya@ethara.ai', role: 'member', team: 'Growth', status: 'online' }
];

export const mockProjects: Project[] = [
  {
    _id: 'p1',
    title: 'Ethara Launch OS',
    description: 'A cohesive launch system for product, growth, and operations.',
    progress: 68,
    color: '#7c3aed',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    members: mockTeam
  },
  {
    _id: 'p2',
    title: 'Enterprise Client Portal',
    description: 'Client-facing dashboard with permissions and reporting.',
    progress: 42,
    color: '#06b6d4',
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18).toISOString(),
    members: mockTeam.slice(0, 2)
  }
];

export const mockTasks: Task[] = [
  { _id: 't1', title: 'Refine onboarding hero', description: 'Bring the narrative closer to the launch message.', priority: 'high', status: 'todo', labels: ['landing', 'copy'], projectId: 'p1', assignedTo: mockTeam[1], dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString() },
  { _id: 't2', title: 'Implement auth protection', description: 'Session persistence and token handling.', priority: 'urgent', status: 'in-progress', labels: ['backend', 'auth'], projectId: 'p1', assignedTo: mockTeam[0], dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString() },
  { _id: 't3', title: 'Polish analytics cards', description: 'Animate KPI cards and top level metrics.', priority: 'medium', status: 'review', labels: ['dashboard'], projectId: 'p2', assignedTo: mockTeam[2] },
  { _id: 't4', title: 'Ship invite flow', description: 'Add invite modal and onboarding emails.', priority: 'low', status: 'completed', labels: ['team'], projectId: 'p2', assignedTo: mockTeam[2] }
];

export const mockActivities: Activity[] = [
  { type: 'task', message: 'Ava moved auth protection into In Progress', userId: mockUser, createdAt: new Date().toISOString() },
  { type: 'project', message: 'New enterprise portal project created', userId: mockTeam[1], createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
  { type: 'comment', message: 'Weekly analytics reviewed by the team', userId: mockTeam[2], createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() }
];
