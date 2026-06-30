import { buildSuccess } from '@repo/contracts'
import type { Context } from 'hono'
import type { Bindings } from '../../lib/types'
import { createMeta } from '../../lib/utils'

export function orderDetailHandler(c: Context<{ Bindings: Bindings }>) {
  const id = c.req.param('id')
  const res = buildSuccess({ id, status: 'pending' }, createMeta())
  return c.json(res)
}
