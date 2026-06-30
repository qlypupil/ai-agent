import type { ApiResponse, PingRequest, PingResponse } from '@repo/contracts'
import { createJsonRequestInit, serverURL } from '../utils'

export async function fetchPing(payload: PingRequest): Promise<ApiResponse<PingResponse>> {
  try {
    const response = await fetch(
      serverURL('/rpc/system/ping'),
      createJsonRequestInit(payload),
    )
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
