import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional().default(''),
  color: z.string().optional().default('#22c55e'),
  deadline: z.coerce.date().optional(),
  members: z.array(z.string()).optional().default([])
});
