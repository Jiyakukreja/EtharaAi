import { formatDistanceToNow } from 'date-fns';

export function formatDeadline(date?: string) {
  if (!date) return 'No deadline';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}
