import Link from 'next/link'
import { ClientPingDemo } from '@/client-api/system/client-ping-demo'

const links = [
  '/verify/system/health',
  '/verify/system/ping',
  '/verify/catalog/list',
  '/verify/user/profile',
  '/verify/order/detail',
]

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-xl font-semibold">API verify</h1>
      <p className="mt-1 text-sm text-content-tertiary">
        Each page calls a single endpoint through its own api.ts layer.
      </p>

      <ul className="mt-6 flex flex-col gap-2">
        {links.map((href) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-content-primary underline underline-offset-4 hover:text-content-secondary"
            >
              {href}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="my-8 border-border-default" />

      <ClientPingDemo />
    </main>
  )
}
