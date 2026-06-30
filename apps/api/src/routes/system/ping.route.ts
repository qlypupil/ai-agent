import { BizCode, PingRequestSchema, type PingRequest, buildFailure, buildSuccess } from '@repo/contracts'
import { zValidator } from '@hono/zod-validator'
import type { Context } from 'hono'
import { getApiEnv } from '../../env'
import type { Bindings } from '../../lib/types'
import { createMeta } from '../../lib/utils'

export const pingValidation = zValidator('json', PingRequestSchema, (result, c) => {
  if (!result.success) {
    return c.json(buildFailure({
      code: BizCode.COMMON_INVALID_REQUEST,
      message: 'Invalid request payload',
      details: (result.error as unknown as { flatten(): unknown }).flatten(),
    }, createMeta()), 400)
  }
})

type PingContext = Context<
  { Bindings: Bindings },
  string,
  { in: { json: PingRequest }; out: { json: PingRequest } }
>

export function pingHandler(c: PingContext) {
  const payload = c.req.valid('json')
  const env = getApiEnv(c.env)
  const successMsg = { service: 'api', message: `pong, ${payload.name}`, env: env.APP_ENV }
  const res = buildSuccess(successMsg, createMeta())
  return c.json(res)
}
