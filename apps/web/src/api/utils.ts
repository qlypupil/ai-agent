import { getWebServerEnv } from '../env.server'

export function serverURL(path: string): string {
  const env = getWebServerEnv()
  return `${env.API_BASE_URL}${path}`
}

export function createJsonRequestInit<T>(body: T): RequestInit {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}
