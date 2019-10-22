import { action, observable } from 'mobx'
import * as EmojiServices from '../apiServices/emojiServices'
import * as EmojiFunc from '../domains/emojis/EmojiFunc'
import { EmojiStat } from '../domains/emojis/EmojiTypes'
import { LoadingState, LoadingStateStatus } from '../types/LoadingState'

export class EmojiStatsStoreClass {
  @observable public emojiStats: EmojiStat = {}
  @observable public loadState: LoadingState = {
    status: LoadingStateStatus.Initial
  }

  @action
  public async fetch(userId: string, year: number, month: number) {
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    const stats = await EmojiServices.fetchEmojiStats(userId, year, month)
    this.emojiStats = EmojiFunc.responseToStats(stats)
    this.loadState = {
      status: LoadingStateStatus.Loaded
    }
  }
}

export default new EmojiStatsStoreClass()
