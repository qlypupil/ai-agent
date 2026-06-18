import { z } from 'zod'

const webServerEnvSchema = z.object({
  APP_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_BASE_URL: z.string().url().default('http://localhost:8787'),
})

export type WebServerEnv = z.infer<typeof webServerEnvSchema>

export function getWebServerEnv(): WebServerEnv {
  return webServerEnvSchema.parse({
    APP_ENV: process.env.APP_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
  })
}
