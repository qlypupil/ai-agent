import type { ApiResponse } from '@repo/contracts'
import { BizCode } from '@repo/contracts'
import { getWebClientEnv } from '@/env.client'
import { getWebServerEnv } from '@/env.server'

export type HttpQuery = Record<string, string | number | boolean | undefined>

export type HttpGetOptions = {
	query?: HttpQuery
	init?: RequestInit
}

export type HttpPostOptions = {
	init?: RequestInit
}

// 单入口 http 模块。调用方不需要关心当前运行在服务端还是客户端。

// 根据环境变量获取基础 URL
function resolveBaseURL() {
	// 浏览器里只能读取 NEXT_PUBLIC_*，服务端则读取私有 API_BASE_URL。
	if (typeof window === 'undefined') {
		return getWebServerEnv().API_BASE_URL
	}

	return getWebClientEnv().NEXT_PUBLIC_API_BASE_URL
}

// 构建查询参数,  GET 请求参数统一转成 query string, 即将 query 对象拼成 URL 查询字符串，自动跳过 undefined 值
function buildSearchParams(query?: HttpQuery) {
	if (!query) {
		return ''
	}

	const params = new URLSearchParams()

	for (const [key, value] of Object.entries(query)) {
		if (value === undefined) {
			continue
		}

		params.set(key, String(value))
	}

	const search = params.toString()

	return search ? `?${search}` : ''
}

// 创建请求初始化对象，根据方法和 payload 自动设置 headers 和 body
// 对于 GET 请求，只使用 init 参数
// 对于 POST 请求，设置 content-type 为 application/json，同时支持传入自定义 init, 合并序列化 payload 为 JSON 字符串作为 body
function createRequestInit(
	method: 'GET' | 'POST',
	payload: unknown,
	init?: RequestInit,
): RequestInit {
	if (method === 'GET') {
		return {
			method,
			...init,
		}
	}

	return {
		method,
		headers: {
			'content-type': 'application/json',
			...(init?.headers ?? {}),
		},
		body: JSON.stringify(payload),
		...init,
	}
}

// 所有 GET/POST 都会收敛到这里：拼 URL、序列化 JSON、调用 fetch、统一异常结构。
async function request<TData>(
	method: 'GET' | 'POST',
	path: string,
	options?: {
		payload?: unknown
		query?: HttpQuery
		init?: RequestInit
	},
): Promise<ApiResponse<TData>> {
	try {
		const url = new URL(
			`${path}${buildSearchParams(options?.query)}`,
			resolveBaseURL(),
		).toString()

		const response = await fetch(
			url,
			createRequestInit(method, options?.payload, options?.init),
		)

		return await response.json()
	} catch (error) {
		return {
			ok: false,
			error: {
				code: BizCode.SYSTEM_UPSTREAM_TIMEOUT,
				message: error instanceof Error ? error.message : 'API request failed',
			},
			meta: {
				requestId: 'unavailable',
				timestamp: new Date().toISOString(),
			},
		}
	}
}

export const http = {
	get<TData>(path: string, options?: HttpGetOptions) {
		return request<TData>('GET', path, {
			query: options?.query,
			init: options?.init,
		})
	},
	post<TReq, TData>(path: string, payload: TReq, options?: HttpPostOptions) {
		return request<TData>('POST', path, {
			payload,
			init: options?.init,
		})
	},
}
