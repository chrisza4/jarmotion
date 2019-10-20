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

export function combineLoadingState(
  loadState1: LoadingState,
  loadState2: LoadingState
): LoadingState {
  if (
    loadState1.status === LoadingStateStatus.Error ||
    loadState2.status === LoadingStateStatus.Error
  ) {
    return { status: LoadingStateStatus.Error, errorMessage: 'Error' }
  }
  if (
    loadState1.status === LoadingStateStatus.Loading ||
    loadState2.status === LoadingStateStatus.Loading
  ) {
    return { status: LoadingStateStatus.Loading }
  }
  if (
    loadState1.status === LoadingStateStatus.Initial ||
    loadState2.status === LoadingStateStatus.Initial
  ) {
    return { status: LoadingStateStatus.Initial }
  }
  return { status: LoadingStateStatus.Loaded }
}
