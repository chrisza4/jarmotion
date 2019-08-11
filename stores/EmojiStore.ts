import { action, observable } from 'mobx'
import { getTodayEmojis } from '../apiServices/emojiServices'
import { IEmoji } from '../domains/emojis/Types'
import { LoadingState } from '../types/types'

export class EmojiStoreClass {
  @observable public loadState: LoadingState = LoadingState.Initial
  @observable public emojis: IEmoji[] = []

  @action.bound
  public addEmojis(emojis: IEmoji[]) {
    this.emojis = [...this.emojis, ...emojis]
  }

  @action
  public async loadEmoji() {
    this.loadState = LoadingState.Loading
    try {
      const res = await getTodayEmojis()
      this.loadState = LoadingState.Loaded
      this.emojis = res
    } catch (err) {
      this.loadState = LoadingState.Error
    }
  }
}

export default new EmojiStoreClass()
