import type { ApiResponse, OrderDetailResponse } from '@repo/contracts'
import { serverURL } from '../utils'

export async function fetchOrderDetail(id: string): Promise<ApiResponse<OrderDetailResponse>> {
  try {
    const response = await fetch(serverURL(`/rpc/order/${id}`))
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
