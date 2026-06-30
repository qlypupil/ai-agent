import type { HealthResponse } from '@repo/contracts'
import { http } from '@/http'

export function getClientHealth() {
  return http.get<HealthResponse>('/health')
}
