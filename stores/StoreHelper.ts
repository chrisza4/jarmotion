import { LoadingState, LoadingStateStatus } from '../types/types'

export interface IAsyncWithLoadstateStore {
  loadState: LoadingState
}

export async function executeAsyncWithLoadState(
  promiseFunc: () => Promise<any>,
  store: IAsyncWithLoadstateStore
): Promise<void> {
  store.loadState = {
    status: LoadingStateStatus.Loading
  }
  try {
    await promiseFunc()
    store.loadState = {
      status: LoadingStateStatus.Loaded
    }
  } catch (err) {
    store.loadState = {
      status: LoadingStateStatus.Error,
      errorMessage: err.message
    }
  }
}
