import { getAuthStatus } from '../localServices/AuthServices'
import { sanitizeBaseUrl } from '../utils/utils'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS'

const BASE_URL = sanitizeBaseUrl('https://a5578c7f.ngrok.io')

type ApiResult<T> = {
  status: number
  body: T
}

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
  const authStatus = await getAuthStatus()
  if (!authStatus.auth) {
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
  return {
    status: response.status,
    body: responseBody
  }
}
