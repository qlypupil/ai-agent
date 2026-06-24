import { Button } from '@repo/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Separator } from '@repo/ui/separator'
import { TailwindDemo } from '@repo/ui/tailwind-demo'
import { AdminEnvBadge } from '../src/admin-env-badge'
import { getAdminServerEnv } from '../src/env.server'

export default function Home() {
  const env = getAdminServerEnv()

  return (
    <>
      <TailwindDemo appName="admin" />

      <section className="mx-auto flex max-w-250 flex-col gap-8 p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-border-default px-3 py-1 text-xs text-content-tertiary">
            server {env.APP_ENV}
          </span>
          <span className="rounded-full border border-border-default px-3 py-1 text-xs text-content-tertiary">
            {env.API_BASE_URL}
          </span>
          <AdminEnvBadge />
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Admin primitive validation</CardTitle>
          <CardDescription>
            This block checks the same shared primitives in a second app with a
            slightly different layout and button sizing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2 md:max-w-md">
            <Label htmlFor="tenant-id">Tenant identifier</Label>
            <Input
              id="tenant-id"
              placeholder="team-enterprise-01"
            />
          </div>
          <Separator />
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Queue sync</Button>
            <Button variant="secondary">Inspect</Button>
            <Button
              size="lg"
              variant="outline"
            >
              Publish changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
