import type { ApiResponse } from '@repo/contracts'
import { serverURL } from '../utils'

export type HealthResponse = { service: string }

export async function fetchHealth(): Promise<ApiResponse<HealthResponse>> {
  try {
    const response = await fetch(serverURL('/health'))
    return await response.json()
  } catch (error) {
    return {
      ok: false,
      error: {
        code: 'SYSTEM.UPSTREAM_TIMEOUT' as const,
        message: error instanceof Error ? error.message : 'API request failed',
      },
      meta: {
        requestId: 'unavailable',
        timestamp: new Date().toISOString(),
      },
    }
  }
}
