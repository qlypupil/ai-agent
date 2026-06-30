import { buildSuccess } from '@repo/contracts'
import type { Context } from 'hono'
import type { Bindings } from '../../lib/types'
import { createMeta } from '../../lib/utils'

export function healthHandler(c: Context<{ Bindings: Bindings }>) {
  const res = buildSuccess({ service: 'api' }, createMeta())
  return c.json(res)
}
