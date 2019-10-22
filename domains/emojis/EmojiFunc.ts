import moment from 'moment'
import { EmojiStat, EmojiType, IEmojiStatsResponse } from './EmojiTypes'

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
