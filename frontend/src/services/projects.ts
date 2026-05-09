import api from './api';
import type { Project } from '@/types';

export async function fetchProjects() {
  const { data } = await api.get('/projects');
  return data;
}

export async function createProject(payload: { title: string; description: string; color: string; deadline?: string; members: string[] }) {
  const { data } = await api.post('/projects', payload);
  return data as { project: Project };
}

export async function fetchProject(id: string) {
  const { data } = await api.get(`/projects/${id}`);
  return data;
}

export async function fetchTasks(params?: Record<string, string>) {
  const { data } = await api.get('/tasks', { params });
  return data;
}
