import { z } from 'zod';

const taskSchema = z.object({
  id: z.string(),
  description: z.string(),
  priority: z.enum(['high', 'medium', 'low']),
  type: z.enum(['scrape', 'analyze', 'monitor', 'interact']),
  config: z.object({
    url: z.string().url().optional(),
    interval: z.number().optional(),
    maxRetries: z.number().optional(),
    timeout: z.number().optional(),
    customParams: z.record(z.any()).optional()
  }).optional(),
  assignedTo: z.string().optional(),
  status: z.enum(['pending', 'assigned', 'running', 'completed', 'failed']).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  completedAt: z.string().optional(),
  error: z.string().optional()
});

export function validateTask(data) {
  return taskSchema.parse(data);
}