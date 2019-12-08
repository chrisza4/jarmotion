import moment from 'moment'
import { IEmoji } from '../../../domains/emojis/EmojiTypes'

export const EMOJI_ANIMATION_GAP_MS = 300

export interface IWaitAnimatingEmoji {
  emoji: IEmoji
  expected_animated_time: Date | null
}

export interface IDeQueueWaitingEmojisResult {
  newQueue: IWaitAnimatingEmoji[]
  emojiToAnimated?: IEmoji
}

export function deQueueWaitingEmojis(
  emojiQueue: IWaitAnimatingEmoji[],
  now = new Date()
): IDeQueueWaitingEmojisResult {
  if (!isNeedAnimated(emojiQueue, now)) {
    return { newQueue: emojiQueue }
  }
  const nextAnimationTime = moment(now)
    .add(EMOJI_ANIMATION_GAP_MS, 'milliseconds')
    .toDate()
  const newQueue: IWaitAnimatingEmoji[] = emojiQueue
    .slice(1)
    .map<IWaitAnimatingEmoji>(e => ({
      expected_animated_time: nextAnimationTime,
      emoji: e.emoji
    }))
  return {
    newQueue,
    emojiToAnimated: emojiQueue[0].emoji
  }
}

export function isNeedAnimated(
  emojiQueue: IWaitAnimatingEmoji[],
  now: Date = new Date()
) {
  const animatingEmoji = emojiQueue[0]
  if (!animatingEmoji) {
    return false
  }
  if (animatingEmoji.expected_animated_time === null) {
    return true
  }
  if (moment(now).isBefore(moment(animatingEmoji.expected_animated_time))) {
    return false
  }
  return true
}
