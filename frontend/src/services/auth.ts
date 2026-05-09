import api from './api';
import type { User } from '@/types';

export async function loginRequest(payload: { email: string; password: string }) {
  const { data } = await api.post('/auth/login', payload);
  return data as { token: string; user: User };
}

export async function signupRequest(payload: { name: string; email: string; password: string; role: 'admin' | 'member' }) {
  const { data } = await api.post('/auth/signup', payload);
  return data as { token: string; user: User };
}

export async function meRequest() {
  const { data } = await api.get('/auth/me');
  return data as { user: User };
}

export async function logoutRequest() {
  const { data } = await api.post('/auth/logout');
  return data as { message: string };
}
