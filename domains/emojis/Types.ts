export enum EmojiType {
  Heart = 'heart'
}

export interface IEmoji {
  emojiType: EmojiType
  id: string
  inserted_at: Date
  owner_id: string
}
