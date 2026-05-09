import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional().default(''),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  dueDate: z.coerce.date().optional(),
  assignedTo: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'review', 'completed']).default('todo'),
  projectId: z.string(),
  labels: z.array(z.string()).optional().default([])
});

export const taskStatusSchema = z.object({
  status: z.enum(['todo', 'in-progress', 'review', 'completed'])
});
