import { ILoginResponse } from '../domains/auth/AuthTypes'
import { IRegistration } from '../domains/registration/RegistrationTypes'
import { unauthFetch } from './apiConnector'
import { ApiError } from './apiTypes'

type RegistrationRequest = {
  code: string
  user: {
    name: string
    password: string
    email: string
  }
}

type ErrorMessage = string

export async function register(
  registration: IRegistration
): Promise<ILoginResponse | ErrorMessage> {
  const request: RegistrationRequest = {
    code: registration.code,
    user: {
      name: registration.name,
      password: registration.password,
      email: registration.email
    }
  }
  const res = await unauthFetch<ILoginResponse>(
    'POST',
    '/api/register',
    request
  )
  if (res.status !== 200) {
    /// HACK
    const apiError = (res.body as unknown) as ApiError
    switch (apiError.error_message) {
      case 'forbidden':
        return 'Invalid registration code'
      case 'duplicate found':
        return 'Email already registered'
    }
  }
  return res.body
}
