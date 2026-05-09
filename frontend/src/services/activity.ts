import api from './api';
import type { Activity } from '@/types';

export async function fetchActivityFeed() {
  const { data } = await api.get('/team/activity');
  return data as { activities: Activity[] };
}
