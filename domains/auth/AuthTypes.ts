type AuthStatusNotUnauthorized = {
  auth: false
}

type AuthStatusAuthorized = {
  auth: true
  token: string
}

export type AuthStatus = AuthStatusAuthorized | AuthStatusNotUnauthorized
