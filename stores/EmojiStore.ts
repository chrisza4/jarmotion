import { action, observable } from 'mobx'
import { addEmoji, getTodayEmojis } from '../apiServices/emojiServices'
import { IEmoji } from '../domains/emojis/Types'
import { LoadingState, LoadingStateStatus } from '../types/types'

export class EmojiStoreClass {
  @observable public loadState: LoadingState = {
    status: LoadingStateStatus.Initial
  }
  @observable public emojis: IEmoji[] = []

  @action.bound
  public async addEmojis(emojis: IEmoji[]) {
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    try {
      const res = await Promise.all(emojis.map(emoji => addEmoji(emoji)))
      this.emojis = [...this.emojis, ...res]
      this.loadState = {
        status: LoadingStateStatus.Loaded
      }
    } catch (err) {
      this.loadState = {
        status: LoadingStateStatus.Error,
        errorMessage: err.message
      }
    }
  }

  @action.bound
  public async loadEmoji() {
    this.loadState = {
      status: LoadingStateStatus.Loading
    }
    try {
      const res = await getTodayEmojis()
      this.loadState = {
        status: LoadingStateStatus.Loaded
      }
      this.emojis = res
    } catch (err) {
      this.loadState = {
        status: LoadingStateStatus.Error,
        errorMessage: err.message
      }
    }
  }
}

export default new EmojiStoreClass()
