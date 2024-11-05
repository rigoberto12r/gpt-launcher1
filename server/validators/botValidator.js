import { z } from 'zod';

const browserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  userAgent: z.string(),
  proxy: z.object({
    enabled: z.boolean(),
    host: z.string().optional(),
    port: z.number().optional(),
    username: z.string().optional()
  }),
  fingerprint: z.object({
    timezone: z.string(),
    resolution: z.string(),
    platform: z.string(),
    language: z.string()
  })
});

const botSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['idle', 'running', 'paused']),
  task: z.string(),
  lastActive: z.string().optional(),
  profile: browserProfileSchema
});

export function validateBot(data) {
  return botSchema.parse(data);
}