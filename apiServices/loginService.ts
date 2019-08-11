import { unauthFetch } from './apiConnector'

type LoginResponse = {
  jwt?: string
}
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await unauthFetch<LoginResponse>('POST', '/api/login', {
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
