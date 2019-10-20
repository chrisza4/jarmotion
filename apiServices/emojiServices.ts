import { EmojiStat, EmojiType, IEmoji } from '../domains/emojis/EmojiTypes'
import { authFetch } from './apiConnector'

export async function fetchEmojis(userId: string): Promise<IEmoji[]> {
  const res = await authFetch<IEmoji[]>('GET', `api/emoji/user/${userId}`)
  if (res.status !== 200) {
    throw Error('Cannot fetch emoji')
  }
  return res.body
}

export async function addEmoji(emoji: IEmoji): Promise<IEmoji> {
  const res = await authFetch<IEmoji>('POST', 'api/emoji/', emoji)
  if (res.status !== 200) {
    if (res.status === 422) {
      throw Error('Cannot save emoji: data error')
    }
    throw Error('Cannot save emoji: Unknown error')
  }
  return res.body
}

export async function fetchEmojiById(id: string): Promise<IEmoji> {
  const res = await authFetch<IEmoji>('GET', `api/emoji/${id}`)
  if (res.status !== 200) {
    throw Error('Cannot fetch emoji')
  }
  return res.body
}

export async function fetchEmojiStats(
  userId: string,
  year: number,
  month: number
): Promise<EmojiStat> {
  // Mock
  const n1 = Math.ceil(Math.random() * 30)
  const n2 = Math.ceil(Math.random() * 30)
  const n3 = Math.ceil(Math.random() * 30)
  return {
    [n1]: EmojiType.Happy,
    [n2]: EmojiType.Sad,
    [n3]: EmojiType.Happy
  }
}
