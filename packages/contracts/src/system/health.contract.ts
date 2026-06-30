import { z } from 'zod'

export const HealthResponseSchema = z.object({
  service: z.literal('api'),
})

export type HealthResponse = z.infer<typeof HealthResponseSchema>
