export type ApiResult<T> = {
  status: number
  body: T
}

export type NonResourceResponse = {
  ok: boolean
}
