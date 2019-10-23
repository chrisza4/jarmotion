import _ from 'lodash'
import { action, observable } from 'mobx'
import Moment from 'moment'
import * as EmojiService from '../apiServices/emojiServices'
import * as EmojiFunc from '../domains/emojis/EmojiFunc'
import { LoadingState, LoadingStateStatus } from '../types/LoadingState'
import { IEmojiTableRow } from '../ui/uikit/emoji/EmojiTable'

export class EmojiSummaryStoreClass {
  @observable public todayEmojiSummary: IEmojiTableRow[] = []
  @observable public loadState: LoadingState = {
    status: LoadingStateStatus.Initial
  }

  @action
  public async fetchEmojiSummarys(userId: string, date: Moment.Moment) {
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    const emojiss = await EmojiService.fetchEmojisByDate(userId, date)
    this.todayEmojiSummary = EmojiFunc.summarize(emojiss)
    this.loadState = {
      status: LoadingStateStatus.Loaded
    }
  }
}

export default new EmojiSummaryStoreClass()
