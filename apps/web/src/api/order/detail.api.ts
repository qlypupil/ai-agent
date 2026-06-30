import type { OrderDetailResponse } from '@repo/contracts'
import { http } from '@/http'

export function getOrderDetail(id: string) {
  return http.get<OrderDetailResponse>(`/rpc/order/${id}`)
}
