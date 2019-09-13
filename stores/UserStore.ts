import { action, computed, observable } from 'mobx'
import * as UserServices from '../apiServices/userServices'
import { IUser } from '../domains/users/UserTypes'

export class UserStoreClass {
  @observable
  private others: IUser[] | null = null

  @observable
  private myself: IUser | null = null

  @action
  public async init() {
    const [me, others] = await Promise.all([
      UserServices.getMyself(),
      UserServices.getUsersInRelationship()
    ])
    this.myself = me
    this.others = others
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
}

export default new UserStoreClass()
