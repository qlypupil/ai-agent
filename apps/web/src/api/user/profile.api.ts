import type { ApiResponse, UserProfileResponse } from '@repo/contracts'
import { serverURL } from '../utils'

export async function fetchUserProfile(): Promise<ApiResponse<UserProfileResponse>> {
  try {
    const response = await fetch(serverURL('/rpc/user'))
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
