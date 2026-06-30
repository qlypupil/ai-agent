import { buildSuccess } from '@repo/contracts'
import type { Context } from 'hono'
import type { Bindings } from '../../lib/types'
import { createMeta } from '../../lib/utils'

export function userProfileHandler(c: Context<{ Bindings: Bindings }>) {
  const res = buildSuccess({ id: 'placeholder', name: 'Guest' }, createMeta())
  return c.json(res)
}
