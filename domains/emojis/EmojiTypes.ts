export enum EmojiType {
  Heart = 'heart',
  Afraid = 'afraid',
  Amused = 'amused',
  Angry = 'angry',
  Anxious = 'anxious',
  Ashamed = 'ashamed',
  Bashful = 'bashful',
  Bored = 'bored',
  Cold = 'cold',
  Confident = 'confident',
  Confused = 'confused',
  Crazy = 'crazy',
  Curious = 'curious',
  Depressed = 'depressed',
  Determined = 'determined',
  Enraged = 'enraged',
  Envious = 'envious',
  Frightened = 'frightened',
  Happy = 'happy',
  Hot = 'hot',
  Indifferent = 'indifferent',
  Jealous = 'jealous',
  Love = 'love',
  Miserable = 'miserable',
  Sad = 'sad',
  Sick = 'sick',
  Sorry = 'sorry',
  Stupid = 'stupid',
  Surprised = 'surprised',
  Suspicious = 'suspicious',
  Withdraw = 'withdraw'
}

export interface IEmoji {
  type: EmojiType
  id: string
  inserted_at: Date
  owner_id: string
}

export type EmojiStat = { [date: number]: EmojiType | undefined }
