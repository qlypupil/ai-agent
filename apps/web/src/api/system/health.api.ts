import { http } from '@/http'

export type HealthResponse = { service: string }

export function getHealth() {
  return http.get<HealthResponse>('/health')
}
