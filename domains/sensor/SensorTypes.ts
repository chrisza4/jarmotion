import { EmojiType } from '../emojis/EmojiTypes'

export interface ISensor {
  id: string
  emoji_type: EmojiType
  threshold: number
}
