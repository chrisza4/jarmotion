import * as EmojiFunc from './EmojiFunc'
import { getMockEmoji } from './EmojiMocks'
import { EmojiType } from './EmojiTypes'

describe('responseToStats', () => {
  it('Should transform emoji response to stats', () => {
    const input = [
      {
        count: 6,
        date: new Date('2019-10-19T00:00:00.000000'),
        type: EmojiType.Withdraw
      },
      {
        count: 1,
        date: new Date('2019-10-23T00:00:00.000000'),
        type: EmojiType.Indifferent
      }
    ]
    const expected = {
      19: EmojiType.Withdraw,
      23: EmojiType.Indifferent
    }
    const actual = EmojiFunc.responseToStats(input)
    expect(actual).toEqual(expected)
  })
})

describe('summarized', () => {
  it('Summarized stats', () => {
    const emojis = [
      getMockEmoji({
        type: EmojiType.Happy,
        inserted_at: new Date('2019-10-23T00:00:00.000000')
      }),
      getMockEmoji({
        type: EmojiType.Happy,
        inserted_at: new Date('2019-10-23T00:00:00.000000')
      }),
      getMockEmoji({
        type: EmojiType.Happy,
        inserted_at: new Date('2019-10-23T00:00:00.000000')
      }),
      getMockEmoji({
        type: EmojiType.Sad,
        inserted_at: new Date('2019-10-23T00:00:00.000000')
      }),
      getMockEmoji({
        type: EmojiType.Bashful,
        inserted_at: new Date('2019-10-23T00:00:00.000000')
      })
    ]
    const actual = EmojiFunc.summarize(emojis)
    expect(actual.length).toEqual(3)
    expect(
      actual.some(a => a.emoji_type === EmojiType.Happy && a.threshold === 3)
    ).toBeTruthy()
    expect(
      actual.some(a => a.emoji_type === EmojiType.Sad && a.threshold === 1)
    ).toBeTruthy()
    expect(
      actual.some(a => a.emoji_type === EmojiType.Bashful && a.threshold === 1)
    ).toBeTruthy()
  })
})
