import Matter from 'matter-js'
import { EmojiType, IEmoji } from '../../../domains/emojis/EmojiTypes'
import { randomToRange } from '../../../utils/utils'
import { IGameEngineEmoji, IJarEngine, PhysicsEngineFunc } from './Types'

const jarboxMatterMap: { [userId: string]: IJarEngine } = {}
export function assertJarboxMatter(
  jarWidth: number,
  jarHeight: number,
  emojis: IEmoji[],
  id: string
) {
  let currentEngine = jarboxMatterMap[id]
  if (!currentEngine) {
    jarboxMatterMap[id] = createJarboxMatter(jarWidth, jarHeight, emojis)
    currentEngine = jarboxMatterMap[id]
  }
  return currentEngine
}

export function createJarboxMatter(
  jarWidth: number,
  jarHeight: number,
  emojis: IEmoji[]
): IJarEngine {
  const Physics: PhysicsEngineFunc = (entities, { time }) => {
    Matter.Engine.update(entities.physics.engine, time.delta)
    return entities
  }

  const engine = Matter.Engine.create({ enableSleeping: false })
  const world = engine.world

  // ==================== Shapes ===============================
  const groundHeight = 1000
  const wallWidth = 30
  const ground = {
    body: Matter.Bodies.rectangle(
      0,
      jarHeight + groundHeight / 2 - 25,
      1000,
      groundHeight,
      {
        isStatic: true
      }
    ),
    size: {
      width: 1000,
      height: groundHeight
    }
  }
  const wallMargin = 10 // Margin between exact border of Jar and area that holding emojis
  // Should be only jarHeight + 100, but Height of Matter.js engine need to double react view height
  const wallHeight = (jarHeight + 100) * 2
  const wallLeft = {
    body: Matter.Bodies.rectangle(
      0 - wallWidth + wallMargin,
      jarHeight,
      wallWidth,
      wallHeight,
      {
        isStatic: true
      }
    ),
    size: {
      width: wallWidth,
      height: wallHeight
    }
  }

  const wallRight = {
    body: Matter.Bodies.rectangle(
      jarWidth - wallMargin,
      jarHeight,
      wallWidth,
      wallHeight,
      {
        isStatic: true
      }
    ),
    size: {
      width: wallWidth,
      height: wallHeight
    }
  }

  const getEmojiBody = (emojiType: EmojiType, id: string): IGameEngineEmoji => {
    const radius = 14
    const jarCenter = jarWidth / 2 - radius
    return {
      body: Matter.Bodies.circle(
        jarCenter + randomToRange(-jarWidth / 8, jarWidth / 8),
        10,
        radius,
        {
          angle: 30,
          frictionAir: 0,
          restitution: 0,
          mass: 0.0000000000000000000000001,
          frictionStatic: 0.8
        },
        6
      ),
      radius,
      emojiType,
      id
    }
  }

  const emojiBodies = emojis.map(emoji => getEmojiBody(emoji.type, emoji.id))

  // ============================================================

  Matter.World.add(world, [
    ground.body,
    ...emojiBodies.map(c => c.body),
    wallLeft.body,
    wallRight.body
  ])

  return {
    Physics,
    engine,
    world,
    ground,
    emojis: emojiBodies,
    wallLeft,
    wallRight,
    addEmoji: (emojiType: EmojiType, id: string): IGameEngineEmoji => {
      const existingEmoji = emojiBodies.find(e => e.id === id)
      if (existingEmoji) {
        return existingEmoji
      }
      const emojiBody = getEmojiBody(emojiType, id)
      Matter.World.add(world, emojiBody.body)
      emojiBodies.push(emojiBody)
      return emojiBody
    },
    clearEmojis: () => {
      emojiBodies.forEach(e => Matter.World.remove(world, e.body))
      emojiBodies.splice(0, emojiBodies.length)
    }
  }
}
