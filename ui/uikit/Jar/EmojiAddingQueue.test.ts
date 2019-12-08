import moment from 'moment'
import { getMockEmoji } from '../../../domains/emojis/EmojiMocks'
import { IWaitAnimatingEmoji } from './EmojiAddingQueue'
import * as EmojiAddingQueue from './EmojiAddingQueue'
describe('isNeedAnimated', () => {
  it('given first emoji in queue expected to update after now, return false', () => {
    const now = moment('2019-01-01').toDate()
    const nextOneSec = moment(now)
      .add('1', 'seconds')
      .toDate()
    const inQueue: IWaitAnimatingEmoji = {
      emoji: getMockEmoji({}),
      expected_animated_time: nextOneSec
    }
    expect(EmojiAddingQueue.isNeedAnimated([inQueue], now)).toEqual(false)
  })

  it('given first emoji in queue expected to update before now, return true', () => {
    const now = moment('2019-01-01').toDate()
    const nextOneSec = moment(now)
      .subtract('1', 'seconds')
      .toDate()
    const inQueue: IWaitAnimatingEmoji = {
      emoji: getMockEmoji({}),
      expected_animated_time: nextOneSec
    }
    expect(EmojiAddingQueue.isNeedAnimated([inQueue], now)).toEqual(true)
  })

  it('given first emoji in queue expected to right now, return true', () => {
    const now = moment('2019-01-01').toDate()
    const inQueue: IWaitAnimatingEmoji = {
      emoji: getMockEmoji({}),
      expected_animated_time: now
    }
    expect(EmojiAddingQueue.isNeedAnimated([inQueue], now)).toEqual(true)
  })

  it('given no emoji in queue, return false', () => {
    expect(EmojiAddingQueue.isNeedAnimated([])).toEqual(false)
  })

  it('given emoji in queue does not have expected time, return true', () => {
    const now = moment('2319-01-01').toDate()
    const inQueue: IWaitAnimatingEmoji = {
      emoji: getMockEmoji({}),
      expected_animated_time: null
    }
    expect(EmojiAddingQueue.isNeedAnimated([inQueue], now)).toEqual(true)
  })
})

describe('deQueueWaitingEmojis', () => {
  it('should dequeue first emoji and shift time of the rest to be 1 secs each', () => {
    const now = moment('2319-01-01').toDate()
    const generateEmojiInQueue = (id: string) => ({
      emoji: getMockEmoji({ id }),
      expected_animated_time: null
    })
    const queue = [
      generateEmojiInQueue('e1'),
      generateEmojiInQueue('e2'),
      generateEmojiInQueue('e3')
    ]

    const firstResult = EmojiAddingQueue.deQueueWaitingEmojis(queue, now)
    expect(firstResult.emojiToAnimated?.id).toEqual('e1')
    expect(firstResult.newQueue.length).toEqual(2)
    const nextAnimatedTime = moment(now).add(
      EmojiAddingQueue.EMOJI_ANIMATION_GAP_MS,
      'milliseconds'
    )
    firstResult.newQueue.forEach(q => {
      if (!q.expected_animated_time) {
        fail('Should have expected animated time')
      }
      const correct = moment(q.expected_animated_time).isSame(nextAnimatedTime)
      expect(correct).toEqual(true)
    })

    const noResult = EmojiAddingQueue.deQueueWaitingEmojis(
      firstResult.newQueue,
      now
    )
    expect(noResult.emojiToAnimated).toBeFalsy()
    expect(noResult.newQueue).toEqual(firstResult.newQueue)

    const secondResult = EmojiAddingQueue.deQueueWaitingEmojis(
      firstResult.newQueue,
      nextAnimatedTime.toDate()
    )

    expect(secondResult.emojiToAnimated?.id).toEqual('e2')
    expect(secondResult.newQueue.length).toEqual(1)
    secondResult.newQueue.forEach(q => {
      if (!q.expected_animated_time) {
        fail('Should have expected animated time')
      }
      const correct = moment(q.expected_animated_time).isSame(
        moment(nextAnimatedTime).add(
          EmojiAddingQueue.EMOJI_ANIMATION_GAP_MS,
          'milliseconds'
        )
      )
      expect(correct).toEqual(true)
    })
  })
})
