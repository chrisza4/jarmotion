import { EmojiType } from './EmojiTypes'

export function emojiDisplayName(emoji: EmojiType): string {
  const str = String(emoji)
  return str.charAt(0).toUpperCase() + str.slice(1)
}
