import { action, computed, observable } from 'mobx'
import * as UserServices from '../apiServices/userServices'
import { IUser } from '../domains/users/UserTypes'
import { LoadingState, LoadingStateStatus } from '../types/LoadingState'

export class UserStoreClass {
  @observable public loadState: LoadingState = {
    status: LoadingStateStatus.Initial
  }
  @observable
  private others: IUser[] | null = null

  @observable
  private myself: IUser | null = null

  @action
  public async init() {
    this.loadState.status = LoadingStateStatus.Loading
    const [me, others] = await Promise.all([
      UserServices.getMyself(),
      UserServices.getUsersInRelationship()
    ])
    this.myself = me
    this.others = others
    this.loadState.status = LoadingStateStatus.Loaded
  }

  @computed
  public get me(): IUser {
    if (this.myself) {
      return this.myself
    }
    return { id: '', email: '', name: '' }
  }

  @computed
  public get couple(): IUser {
    if (!this.others) {
      return { id: '', email: '', name: '' }
    }
    return this.others[0]
  }

  @computed public get users(): IUser[] {
    if (!this.myself) {
      return []
    }
    return [this.me, ...(this.others || [])]
  }
}

export default new UserStoreClass()
