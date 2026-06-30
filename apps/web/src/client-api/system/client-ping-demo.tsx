'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getClientHealth } from '@/client-api/system/health.api'
import { postClientPing } from '@/client-api/system/ping.api'

const HEALTH_QUERY_KEY = ['system-health']

export function ClientPingDemo() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, isSuccess, error, refetch } = useQuery({
    queryKey: HEALTH_QUERY_KEY,
    queryFn: getClientHealth,
  })

  const pingMutation = useMutation({
    mutationFn: () => postClientPing({ name: 'client-web' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: HEALTH_QUERY_KEY })
    },
  })

  return (
    <div className="grid gap-4">
      <section className="rounded-xl border border-border-default bg-surface-canvas p-4">
        <h2 className="text-sm font-semibold">useQuery — GET /health</h2>
        <div className="mt-2 text-xs text-content-tertiary">
          {isLoading && <span>Loading...</span>}
          {isError && <span className="text-red-500">Error: {error.message}</span>}
          {isSuccess && (
            <pre className="whitespace-pre-wrap break-all">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
        <button
          onClick={() => refetch()}
          className="mt-3 rounded-lg border border-border-default px-3 py-1 text-xs"
        >
          Refetch health
        </button>
      </section>

      <section className="rounded-xl border border-border-default bg-surface-canvas p-4">
        <h2 className="text-sm font-semibold">useMutation — POST /rpc/system/ping</h2>
        <button
          onClick={() => pingMutation.mutate()}
          disabled={pingMutation.isPending}
          className="mt-2 rounded-lg bg-brand px-4 py-1.5 text-xs text-white disabled:opacity-50"
        >
          {pingMutation.isPending ? 'Pending...' : 'Send ping'}
        </button>
        {pingMutation.isSuccess && (
          <pre className="mt-3 whitespace-pre-wrap break-all text-xs text-content-tertiary">
            {JSON.stringify(pingMutation.data, null, 2)}
          </pre>
        )}
        {pingMutation.isError && (
          <p className="mt-2 text-xs text-red-500">Error: {pingMutation.error.message}</p>
        )}
      </section>
    </div>
  )
}
