import { buildSuccess } from '@repo/contracts'
import type { Context } from 'hono'
import type { Bindings } from '../../lib/types'
import { createMeta } from '../../lib/utils'

export function catalogListHandler(c: Context<{ Bindings: Bindings }>) {
  const res = buildSuccess({ items: [] }, createMeta())
  return c.json(res)
}
