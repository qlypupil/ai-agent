import { fetchCatalogList } from '@/src/api/catalog/list.api'

export const dynamic = 'force-dynamic'

export default async function CatalogListPage() {
  const result = await fetchCatalogList()
  const responseBody = JSON.stringify(result, null, 2)

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-xl font-semibold">GET /rpc/catalog</h1>
      <p className="mt-1 text-sm text-content-tertiary">Catalog list endpoint</p>

      <section className="mt-6 rounded-xl border border-border-default bg-surface-canvas p-4">
        <p className="text-sm font-medium text-content-primary">Response</p>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs leading-6 text-content-tertiary">
          {responseBody}
        </pre>
      </section>
    </main>
  )
}
