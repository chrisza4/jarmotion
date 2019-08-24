import { action, observable } from 'mobx'
import { addEmoji, getTodayEmojis } from '../apiServices/emojiServices'
import { IEmoji } from '../domains/emojis/EmojiTypes'
import { LoadingState, LoadingStateStatus } from '../types/types'
import { executeAsyncWithLoadState } from './StoreHelper'

export class EmojiStoreClass {
  @observable public loadState: LoadingState = {
    status: LoadingStateStatus.Initial
  }
  @observable public emojis: IEmoji[] = []

  @action.bound
  public async addEmojis(emojis: IEmoji[]) {
    await executeAsyncWithLoadState(async () => {
      const res = await Promise.all(emojis.map(emoji => addEmoji(emoji)))
      this.emojis = [...this.emojis, ...res]
    }, this)
  }

  @action.bound
  public async loadEmoji() {
    await executeAsyncWithLoadState(async () => {
      this.emojis = await getTodayEmojis()
    }, this)
  }
}

export default new EmojiStoreClass()
