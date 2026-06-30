import type { ApiResponse, CatalogListResponse } from '@repo/contracts'
import { serverURL } from '../utils'

export async function fetchCatalogList(): Promise<ApiResponse<CatalogListResponse>> {
  try {
    const response = await fetch(serverURL('/rpc/catalog'))
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
