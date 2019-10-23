import _ from 'lodash'
import { action, observable } from 'mobx'
import Moment from 'moment'
import * as EmojiService from '../apiServices/emojiServices'
import * as EmojiFunc from '../domains/emojis/EmojiFunc'
import { IUser } from '../domains/users/UserTypes'
import { LoadingState, LoadingStateStatus } from '../types/LoadingState'
import { IEmojiTableRow } from '../ui/uikit/emoji/EmojiTable'

export class EmojiSummaryStoreClass {
  @observable public currentSummary: IEmojiTableRow[] = []
  @observable public loadState: LoadingState = {
    status: LoadingStateStatus.Initial
  }
  @observable public date: Moment.Moment = Moment()
  @observable public currentUser: IUser | null = null

  @action
  public async fetchEmojiSummarys(user: IUser, date: Moment.Moment) {
    this.date = date
    this.currentUser = user
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    const emojiss = await EmojiService.fetchEmojisByDate(user.id, date)
    this.currentSummary = EmojiFunc.summarize(emojiss)
    this.loadState = {
      status: LoadingStateStatus.Loaded
    }
  }
}

export default new EmojiSummaryStoreClass()
