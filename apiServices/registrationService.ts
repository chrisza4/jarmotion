import { ILoginResponse } from '../domains/auth/AuthTypes'
import { IRegistration } from '../domains/registration/RegistrationTypes'
import { unauthFetch } from './apiConnector'

export async function register(
  registration: IRegistration
): Promise<ILoginResponse | false> {
  const res = await unauthFetch<ILoginResponse>(
    'POST',
    '/api/register',
    registration
  )
  if (res.status !== 200) {
    return false
  }
  return res.body
}
