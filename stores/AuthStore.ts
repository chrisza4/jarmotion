import { action, computed, observable } from 'mobx'
import { AuthStatus } from '../domains/auth/AuthTypes'
import * as AuthServices from '../localServices/AuthServices'

type AuthStatusLoading = {
  auth: 'loading'
}

export type AuthStoreStatus = AuthStatus | AuthStatusLoading

export class AuthStoreClass {
  @observable
  private authToken: string | null = null

  @computed
  public get getAuthStatus(): AuthStoreStatus {
    if (this.authToken === null) {
      return { auth: 'loading' }
    }
    if (this.authToken === '') {
      return { auth: false }
    }
    return { auth: true, token: this.authToken }
  }

  @action
  public async setAuthToken(token: string): Promise<void> {
    await AuthServices.setAuthToken(token)
    this.authToken = token
  }

  @action
  public async initFromStorage() {
    const status = await AuthServices.getAuthStatus()
    this.authToken = status.auth ? status.token : ''
  }
}

export default new AuthStoreClass()
