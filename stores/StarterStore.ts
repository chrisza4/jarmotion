import { action } from 'mobx'
import AuthStore, { AuthStoreClass } from './AuthStore'
import UserStore, { UserStoreClass } from './UserStore'

export class StarterStoreClass {
  constructor(
    readonly userStore: UserStoreClass,
    readonly authStore: AuthStoreClass
  ) {}

  @action
  public async initApp() {
    await this.authStore.initFromStorage()
    if (!this.authStore.getAuthStatus.auth) {
      return
    }
    return this.userStore.init()
  }
}

export default new StarterStoreClass(UserStore, AuthStore)
