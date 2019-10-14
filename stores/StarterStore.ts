import { action } from 'mobx'
import { IJarmotionEntity } from '../domains/general/GeneralTypes'
import { establishedSocket } from '../socket/socketConnection'
import AlertStore, { AlertStoreClass } from './AlertStore'
import AuthStore, { AuthStoreClass } from './AuthStore'
import EmojiStore from './EmojiStore'
import UserStore, { UserStoreClass } from './UserStore'

export class StarterStoreClass {
  constructor(
    readonly userStore: UserStoreClass,
    readonly authStore: AuthStoreClass,
    readonly alertStore: AlertStoreClass
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
    await Promise.all([this.userStore.init(), this.alertStore.init()])
    const socket = await establishedSocket(
      this.authStore.getAuthStatus.token,
      [this.userStore.me.id, this.userStore.couple.id],
      () => {
        // tslint:disable-next-line: no-console
        console.error('Socket error, retrying')
      }
    )
    socket.on('emoji:add', (entity: IJarmotionEntity) => {
      EmojiStore.fetchEmoji(entity.id)
    })
    socket.on('alert:add', (entity: IJarmotionEntity) => {
      AlertStore.fetchAlert(entity.id)
    })
  }
}

export default new StarterStoreClass(UserStore, AuthStore, AlertStore)
