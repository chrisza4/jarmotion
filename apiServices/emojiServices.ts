import { IEmoji } from '../domains/emojis/EmojiTypes'
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
    throw Error('Cannot save emoji')
  }
  return res.body
}
