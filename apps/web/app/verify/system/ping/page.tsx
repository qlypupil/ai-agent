import type { PingRequest } from '@repo/contracts'
import { fetchPing } from '@/src/api/system/ping.api'

export const dynamic = 'force-dynamic'

export default async function PingPage() {
  const payload: PingRequest = { name: 'web' }
  const result = await fetchPing(payload)
  const requestBody = JSON.stringify(payload, null, 2)
  const responseBody = JSON.stringify(result, null, 2)

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-xl font-semibold">POST /rpc/system/ping</h1>
      <p className="mt-1 text-sm text-content-tertiary">RPC ping with shared contract validation</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border-default bg-surface-canvas p-4">
          <p className="text-sm font-medium text-content-primary">Request</p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs leading-6 text-content-tertiary">
            {requestBody}
          </pre>
        </section>
        <section className="rounded-xl border border-border-default bg-surface-canvas p-4">
          <p className="text-sm font-medium text-content-primary">Response</p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs leading-6 text-content-tertiary">
            {responseBody}
          </pre>
        </section>
      </div>
    </main>
  )
}
