import { action, observable } from 'mobx'
import uuid from 'uuid'
import { EmojiType, IEmoji } from '../domains/emojis/Types'
import { LoadingState } from '../types/types'

export class EmojiStoreClass {
  @observable public loadState: LoadingState = LoadingState.Initial
  @observable public emojis: IEmoji[] = [
    { id: uuid.v4(), emojiType: EmojiType.Heart, inserted_at: new Date() },
    { id: uuid.v4(), emojiType: EmojiType.Heart, inserted_at: new Date() },
    { id: uuid.v4(), emojiType: EmojiType.Heart, inserted_at: new Date() },
    { id: uuid.v4(), emojiType: EmojiType.Heart, inserted_at: new Date() }
  ]

  @action.bound
  public setEmojis(emojis: IEmoji[]) {
    this.emojis = emojis
  }
}

export default new EmojiStoreClass()
