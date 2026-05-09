export type Role = 'admin' | 'member';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  team?: string;
  status?: 'online' | 'away' | 'offline';
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  progress: number;
  color?: string;
  deadline?: string;
  members: User[];
  createdBy?: User;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate?: string;
  assignedTo?: User;
  status: TaskStatus;
  projectId: Project | string;
  labels: string[];
  comments?: Array<{ user: User | string; text: string; createdAt: string }>;
  position?: number;
}

export interface Activity {
  _id?: string;
  type: string;
  message: string;
  createdAt?: string;
  userId?: User;
}
