import { action, computed, observable } from 'mobx'
import * as DeviceServices from '../apiServices/deviceServices'
import { IJarmotionEntity } from '../domains/general/GeneralTypes'
import { establishedSocket } from '../socket/socketConnection'
import { LoadingStateStatus } from '../types/LoadingState'
import AlertStore, { AlertStoreClass } from './AlertStore'
import AuthStore, { AuthStoreClass } from './AuthStore'
import EmojiStore from './EmojiStore'
import UserStore, { UserStoreClass } from './UserStore'

export enum AppLoadingStatus {
  Loading = 'loading',
  Unauthorized = 'unauth',
  Ready = 'auth & ready'
}

export class StarterStoreClass {
  @observable
  public starterStatus: LoadingStateStatus = LoadingStateStatus.Initial

  constructor(
    readonly userStore: UserStoreClass,
    readonly authStore: AuthStoreClass,
    readonly alertStore: AlertStoreClass
  ) {}

  @computed
  public get appReadinessStatus(): AppLoadingStatus {
    if (this.starterStatus !== LoadingStateStatus.Loaded) {
      return AppLoadingStatus.Loading
    }

    switch (this.authStore.getAuthStatus.auth) {
      case 'loading':
        return AppLoadingStatus.Loading
      case false:
        return AppLoadingStatus.Unauthorized
      case true:
        return AppLoadingStatus.Ready
    }
  }

  @action
  public async initApp(token?: string) {
    this.starterStatus = LoadingStateStatus.Loading
    if (!token) {
      await this.authStore.initFromStorage()
    } else {
      await this.authStore.setAuthToken(token)
    }
    if (this.authStore.getAuthStatus.auth === 'loading') {
      throw Error('Unexpected loading auth')
    }
    if (!this.authStore.getAuthStatus.auth) {
      this.starterStatus = LoadingStateStatus.Loaded
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
