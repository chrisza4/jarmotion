import { ILoginResponse } from '../domains/auth/AuthTypes'
import { unauthFetch } from './apiConnector'

export async function login(
  email: string,
  password: string
): Promise<ILoginResponse> {
  const res = await unauthFetch<ILoginResponse>('POST', '/api/login', {
    email,
    password
  })
  if (res.status !== 200) {
    return {
      jwt: undefined
    }
  }
  return res.body
}
