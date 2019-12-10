import { action, computed, observable } from 'mobx'
import * as DeviceServices from '../apiServices/deviceServices'
import { IJarmotionEntity } from '../domains/general/GeneralTypes'
import { establishedSocket } from '../socket/socketConnection'
import { LoadingStateStatus } from '../types/LoadingState'
import AlertStore, { AlertStoreClass } from './AlertStore'
import AuthStore, { AuthStoreClass } from './AuthStore'
import EmojiStore from './EmojiStore'
import UserStore, { UserStoreClass } from './UserStore'

export class StarterStoreClass {
  @observable
  public starterStatus: LoadingStateStatus = LoadingStateStatus.Initial

  constructor(
    readonly userStore: UserStoreClass,
    readonly authStore: AuthStoreClass,
    readonly alertStore: AlertStoreClass
  ) {}

  @computed
  public get isReady(): boolean {
    return this.starterStatus === LoadingStateStatus.Loaded
  }

  @action
  public async initApp() {
    await this.authStore.initFromStorage()
    if (
      !this.authStore.getAuthStatus.auth ||
      this.authStore.getAuthStatus.auth === 'loading'
    ) {
      return
    }
    DeviceServices.regisDevice().catch(error =>
      // tslint:disable-next-line: no-console
      console.error('Register device error:', error)
    )
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
    this.starterStatus = LoadingStateStatus.Loaded
  }

  @action
  public clean() {
    this.starterStatus = LoadingStateStatus.Initial
    this.userStore.clean()
  }
}

export default new StarterStoreClass(UserStore, AuthStore, AlertStore)
