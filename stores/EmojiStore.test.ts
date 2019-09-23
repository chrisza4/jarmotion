import { addEmoji, fetchEmojiById } from '../apiServices/emojiServices'
import { getMockEmoji } from '../domains/emojis/EmojiMocks'
import { EmojiStoreClass } from './EmojiStore'
jest.mock('../apiServices/emojiServices.ts')

describe('EmojiStore', () => {
  describe('update emoji', () => {
    let emojiStore: EmojiStoreClass

    beforeEach(async () => {
      emojiStore = new EmojiStoreClass()
      const addEmojiMock = addEmoji as jest.Mock
      const mockEmojis = getMockEmoji({ id: 'emoji1', owner_id: 'user1' })
      addEmojiMock.mockResolvedValue(mockEmojis)
      const fetchEmojiByIdMock = fetchEmojiById as jest.Mock
      fetchEmojiByIdMock.mockResolvedValue(getMockEmoji({ id: 'emoji2' }))
      await emojiStore.addEmojis([mockEmojis], 'user1')
    })

    it('Refetch emoji if not exists in store', async () => {
      await emojiStore.fetchEmojiById('emoji2')
      expect(emojiStore.emojis.length).toEqual(2)
      expect(emojiStore.emojis.find(e => e.id === 'emoji1')).toBeTruthy()
      expect(emojiStore.emojis.find(e => e.id === 'emoji2')).toBeTruthy()
    })

    it('Do not refetch emoji if already exists in store', async () => {
      await emojiStore.fetchEmojiById('emoji1')
      expect(emojiStore.emojis.length).toEqual(1)
      expect(emojiStore.emojis.find(e => e.id === 'emoji1')).toBeTruthy()
    })
  })
})
