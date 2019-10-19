import { EmojiType } from '../emojis/EmojiTypes'

export interface ISensor {
  emoji_type: EmojiType
  threshold: number
}
