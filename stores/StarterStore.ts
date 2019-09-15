import { action } from 'mobx'
import { establishedSocket } from '../socket/socketConnection'
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
    if (
      !this.authStore.getAuthStatus.auth ||
      this.authStore.getAuthStatus.auth === 'loading'
    ) {
      return
    }
    await this.userStore.init()
    await establishedSocket(
      this.authStore.getAuthStatus.token,
      [this.userStore.me.id, this.userStore.couple.id],
      () => {
        console.error('Socket error, retrying')
      }
    )
  }
}

export default new StarterStoreClass(UserStore, AuthStore)
