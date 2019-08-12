export enum LoadingStateStatus {
  Initial,
  Loading,
  Loaded,
  Error
}

type LoadingStateNormal = {
  status:
    | LoadingStateStatus.Initial
    | LoadingStateStatus.Loading
    | LoadingStateStatus.Loaded
}

type LoadingStateError = {
  status: LoadingStateError
  errorMessage: string
}

export type LoadingState = LoadingStateError | LoadingStateNormal
