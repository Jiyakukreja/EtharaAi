import api from './api';
import type { Task } from '@/types';

export async function createTask(payload: {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  assignedTo?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  projectId: string;
  labels: string[];
}) {
  const { data } = await api.post('/tasks', payload);
  return data as { task: Task };
}

export async function fetchTasks(params?: Record<string, string>) {
  const { data } = await api.get('/tasks', { params });
  return data as { tasks: Task[] };
}
