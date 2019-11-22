export type ApiResult<T> = {
  status: number
  body: T
}

export type NonResourceResponse = {
  ok: boolean
}

export type ApiError = {
  error_message: string
  error_status: string
}
