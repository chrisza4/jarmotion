import { action } from 'mobx'
import { connect, listen } from '../socket/socketConnection'
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
    const socket = await connect(
      this.authStore.getAuthStatus.token,
      () => {
        console.log('Error, retrying')
      }
    )
    const channel1 = await listen(socket, this.userStore.me.id)
    const channel2 = await listen(socket, this.userStore.couple.id)
  }
}

export default new StarterStoreClass(UserStore, AuthStore)
