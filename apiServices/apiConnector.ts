import AuthStore from '../stores/AuthStore'
import { sanitizeBaseUrl } from '../utils/utils'
import { ApiResult } from './apiTypes'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS'

export const BASE_URL = sanitizeBaseUrl('https://413fab6c.ngrok.io')

export async function unauthFetch<T>(
  method: HttpMethod,
  url: string,
  body: object
): Promise<ApiResult<T>> {
  const response = await fetch(BASE_URL + url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const responseBody = (await response.json()) as T
  return {
    status: response.status,
    body: responseBody
  }
}

export async function authFetch<T>(
  method: HttpMethod,
  url: string,
  body?: object
): Promise<ApiResult<T>> {
  const authStatus = AuthStore.getAuthStatus
  if (!authStatus.auth || authStatus.auth === 'loading') {
    throw Error('Not authorized')
  }
  const response = await fetch(BASE_URL + url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authStatus.token}`
    },
    body: JSON.stringify(body)
  })

  const responseBody = (await response.json()) as T
  if (response.status === 403) {
    AuthStore.destroyAuthToken()
  }
  return {
    status: response.status,
    body: responseBody
  }
}
