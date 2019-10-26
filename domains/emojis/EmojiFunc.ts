import moment from 'moment'
import uuid from 'uuid'
import { IEmojiTableRow } from '../../ui/uikit/emoji/EmojiTable'
import { EmojiStat, EmojiType, IEmoji, IEmojiStatsResponse } from './EmojiTypes'

export function emojiDisplayName(emoji: EmojiType): string {
  const str = String(emoji)
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function responseToStats(
  emojiResponse: IEmojiStatsResponse[]
): EmojiStat {
  return emojiResponse.reduce<EmojiStat>((acc, emojiRes) => {
    const date = moment(emojiRes.date).date()
    acc[date] = emojiRes.type
    return acc
  }, {})
}

export function summarize(emojis: IEmoji[]): IEmojiTableRow[] {
  return Object.values(
    emojis.reduce<{ [key: string]: IEmojiTableRow }>((acc, emoji) => {
      if (!acc[emoji.type]) {
        acc[emoji.type] = {
          id: uuid.v4(),
          emoji_type: emoji.type,
          threshold: 1
        }
      } else {
        acc[emoji.type].threshold++
      }
      return acc
    }, {})
  ).sort((a, b) => {
    switch (true) {
      case a.threshold > b.threshold:
        return -1
      case a.threshold < b.threshold:
        return 1
      default:
        return 0
    }
  })
}
