import { action, observable } from 'mobx'
import { addEmoji, getTodayEmojis } from '../apiServices/emojiServices'
import { IEmoji } from '../domains/emojis/Types'
import { LoadingStateStatus } from '../types/types'

export class EmojiStoreClass {
  @observable public loadState: LoadingStateStatus = LoadingStateStatus.Initial
  @observable public emojis: IEmoji[] = []

  @action.bound
  public async addEmojis(emojis: IEmoji[]) {
    try {
      const res = await Promise.all(emojis.map(emoji => addEmoji(emoji)))
      this.emojis = [...this.emojis, ...res]
    } catch (err) {
      this.loadState = LoadingStateStatus.Error
    }
  }

  @action.bound
  public async loadEmoji() {
    this.loadState = LoadingStateStatus.Loading
    try {
      const res = await getTodayEmojis()
      this.loadState = LoadingStateStatus.Loaded
      this.emojis = res
    } catch (err) {
      this.loadState = LoadingStateStatus.Error
    }
  }
}

export default new EmojiStoreClass()
