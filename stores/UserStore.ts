import { action, computed, observable } from 'mobx'
import * as UserServices from '../apiServices/userServices'
import { IUser, IUserUpdate } from '../domains/users/UserTypes'
import { LoadingState, LoadingStateStatus } from '../types/LoadingState'

export class UserStoreClass {
  @computed
  public get me(): IUser {
    if (this.myself) {
      return this.myself
    }
    return { id: '', email: '', name: '' }
  }

  @computed
  public get couple(): IUser {
    if (!this.others || this.others.length === 0) {
      return { id: '', email: '', name: '' }
    }
    return this.others[0] || { id: '', email: '', name: '' }
  }

  @computed public get users(): IUser[] {
    if (!this.myself) {
      return []
    }
    return [this.me, ...(this.others || [])]
  }

  @observable public loadState: LoadingState = {
    status: LoadingStateStatus.Initial
  }
  @observable
  private others: IUser[] | null = null

  @observable
  private myself: IUser | null = null

  private initPromise: Promise<void> | null = null

  @action
  public async init() {
    if (!this.initPromise) {
      this.initPromise = this.initPrivately()
    }
    return this.initPromise
  }

  @action
  public async updateProfile(updates: IUserUpdate) {
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    const newMe = await UserServices.updateProfile(updates)
    this.myself = newMe
    this.loadState = {
      status: LoadingStateStatus.Loaded
    }
  }

  @action
  public async uploadAvatar(uri: string) {
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    const newMe = await UserServices.uploadAvatar(uri)
    this.myself = newMe
    this.loadState = {
      status: LoadingStateStatus.Loaded
    }
  }

  @action
  public async addLover(userId: string) {
    if (this.others && this.others.length > 0) {
      throw Error('Couple already exists')
    }
    const couple = await UserServices.addLover(userId)
    this.others = [couple]
  }

  @action
  public clean() {
    this.myself = null
    this.initPromise = null
    this.others = null
    this.loadState = {
      status: LoadingStateStatus.Initial
    }
  }

  private async initPrivately() {
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    const [me, others] = await Promise.all([
      UserServices.getMyself(),
      UserServices.getUsersInRelationship()
    ])
    this.myself = me
    this.others = others
    this.loadState = {
      status: LoadingStateStatus.Loaded
    }
  }
}

export default new UserStoreClass()
