import { IEmoji } from '../domains/emojis/Types'
import { authFetch } from './apiConnector'

export async function getTodayEmojis(): Promise<IEmoji[]> {
  const res = await authFetch<IEmoji[]>('GET', '/api/emoji/')
  if (res.status !== 200) {
    throw Error('Cannot fetch today emoji')
  }
  return res.body
}
