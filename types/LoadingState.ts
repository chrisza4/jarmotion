export enum LoadingStateStatus {
  Initial = 'initial',
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error'
}

type LoadingStateNormal = {
  status:
    | LoadingStateStatus.Initial
    | LoadingStateStatus.Loading
    | LoadingStateStatus.Loaded
}

type LoadingStateError = {
  status: LoadingStateStatus.Error
  errorMessage: string
}

export type LoadingState = LoadingStateError | LoadingStateNormal
export const defaultLoadingState = {
  status: LoadingStateStatus.Initial
}
