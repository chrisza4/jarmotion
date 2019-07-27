import { EmojiType } from '../../../domains/emojis/Types'

interface IGameEngineWall {
  body: Matter.Body
  size: {
    width: number
    height: number
  }
}

export interface IGameEngineEmoji {
  body: Matter.Body
  radius: number
  emojiType: EmojiType
}

export type PhysicsEngineFunc = (entities: any, time: any) => any

export interface IJarEngine {
  Physics: PhysicsEngineFunc
  engine: Matter.Engine
  world: Matter.World
  ground: IGameEngineWall
  wallLeft: IGameEngineWall
  wallRight: IGameEngineWall
  emojis: IGameEngineEmoji[]
  addEmoji: (emojiType: EmojiType) => IGameEngineEmoji
}
