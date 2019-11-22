type AuthStatusNotUnauthorized = {
  auth: false
}

type AuthStatusAuthorized = {
  auth: true
  token: string
}
export interface ILoginResponse {
  readonly jwt?: string
}
export type AuthStatus = AuthStatusAuthorized | AuthStatusNotUnauthorized
