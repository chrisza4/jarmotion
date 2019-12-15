import { action, computed, observable } from 'mobx'
import { AuthStatus } from '../domains/auth/AuthTypes'
import * as AuthServices from '../localServices/AuthServices'

type AuthStatusLoading = {
  auth: 'loading'
}

export type AuthStoreStatus = AuthStatus | AuthStatusLoading

export class AuthStoreClass {
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

  @observable
  public hasLoggedIn: boolean = false
  @observable
  private authToken: string | null = null

  @action
  public async setAuthToken(token: string): Promise<void> {
    await AuthServices.setAuthToken(token)
    this.hasLoggedIn = true
    this.authToken = token
  }

  @action
  public async destroyAuthToken(): Promise<void> {
    await AuthServices.setAuthToken('')
    this.authToken = ''
  }

  @action
  public async initFromStorage() {
    const [status, hasLoggedIn]: [AuthStatus, boolean] = await Promise.all([
      AuthServices.getAuthStatus(),
      AuthServices.hasLoggedIn()
    ])
    this.hasLoggedIn = hasLoggedIn
    this.authToken = status.auth ? status.token : ''
  }
}

export default new AuthStoreClass()
