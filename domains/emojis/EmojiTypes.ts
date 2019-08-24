export enum EmojiType {
  Heart = 'heart'
}

export interface IEmoji {
  type: EmojiType
  id: string
  inserted_at: Date
  owner_id: string
}
