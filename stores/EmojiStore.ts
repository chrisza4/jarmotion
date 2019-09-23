import { action, observable } from 'mobx'
import { computedFn } from 'mobx-utils'
import {
  addEmoji,
  fetchEmojiById,
  fetchEmojis
} from '../apiServices/emojiServices'
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
    const newEmojis = await fetchEmojis(userId)
    this.emojis = [...this.emojis, ...newEmojis]
    this.loadState[userId] = {
      status: LoadingStateStatus.Loaded
    }
  }

  @action.bound
  public async fetchEmojiById(id: string) {
    if (this.getEmojiById(id)) {
      return
    }
    const emoji = await fetchEmojiById(id)
    this.emojis = [...this.emojis, emoji]
  }

  private getEmojiById = (id: string) =>
    this.emojis.find(emoji => emoji.id === id)
}

export default new EmojiStoreClass()
