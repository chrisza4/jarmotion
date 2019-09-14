import { action, observable } from 'mobx'
import { computedFn } from 'mobx-utils'
import { addEmoji, fetchEmojis } from '../apiServices/emojiServices'
import { IEmoji } from '../domains/emojis/EmojiTypes'
import {
  defaultLoadingState,
  LoadingState,
  LoadingStateStatus
} from '../types/LoadingState'

export class EmojiStoreClass {
  @observable public loadState: { [userId: string]: LoadingState } = {}

  @observable public emojis: IEmoji[] = []

  public getEmojisByUserId = computedFn((userId: string) => {
    return this.emojis.filter(emoji => emoji.owner_id === userId)
  })

  public getLoadStateByUserId = computedFn((userId: string) => {
    return this.loadState[userId] || defaultLoadingState
  })

  @action.bound
  public async addEmojis(emojis: IEmoji[], userId: string) {
    this.loadState[userId] = {
      status: LoadingStateStatus.Loading
    }
    const res = await Promise.all(emojis.map(emoji => addEmoji(emoji)))
    this.emojis = [...this.emojis, ...res]
    this.loadState[userId] = {
      status: LoadingStateStatus.Loaded
    }
  }

  @action.bound
  public async loadEmoji(userId: string) {
    this.loadState[userId] = {
      status: LoadingStateStatus.Loading
    }
    this.emojis = await fetchEmojis(userId)
    this.loadState[userId] = {
      status: LoadingStateStatus.Loaded
    }
  }
}

export default new EmojiStoreClass()
