import uuid from 'uuid'
import { EmojiType, IEmoji } from './EmojiTypes'

export function getMockEmoji(emojiProps: Partial<IEmoji>): IEmoji {
  return {
    id: uuid.v4(),
    inserted_at: new Date(),
    owner_id: '',
    type: EmojiType.Heart,
    ...emojiProps
  }
}
