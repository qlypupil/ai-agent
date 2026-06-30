import { z } from 'zod'

export const OrderDetailResponseSchema = z.object({
  id: z.string(),
  status: z.string(),
})

export type OrderDetailResponse = z.infer<typeof OrderDetailResponseSchema>
