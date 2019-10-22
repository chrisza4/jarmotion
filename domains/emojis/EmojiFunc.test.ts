import * as EmojiFunc from './EmojiFunc'
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
