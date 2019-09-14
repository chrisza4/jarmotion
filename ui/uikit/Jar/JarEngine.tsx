import Matter from 'matter-js'
import { EmojiType, IEmoji } from '../../../domains/emojis/EmojiTypes'
import { IGameEngineEmoji, IJarEngine, PhysicsEngineFunc } from './Types'

export function getEngine(
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
  const wallLeft = {
    body: Matter.Bodies.rectangle(
      0 - wallWidth + wallMargin,
      jarHeight,
      wallWidth,
      1000,
      {
        isStatic: true
      }
    ),
    size: {
      width: wallWidth,
      height: 1000
    }
  }

  const wallRight = {
    body: Matter.Bodies.rectangle(
      jarWidth - wallMargin,
      jarHeight,
      wallWidth,
      1000,
      {
        isStatic: true
      }
    ),
    size: {
      width: wallWidth,
      height: 1000
    }
  }

  const getEmojiBody = (emojiType: EmojiType): IGameEngineEmoji => {
    const radius = 11
    const x = jarWidth / 2 - radius // Center of Jar
    const y = 10 // Down a little bit
    // return {
    //   body: Matter.Bodies.rectangle(x, y, 22, 22, {
    //     frictionAir: 0,
    //     restitution: 0,
    //     mass: 100
    //   }),
    //   radius,
    //   emojiType
    // }
    return {
      body: Matter.Bodies.circle(
        jarWidth / 2 - radius,
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
      emojiType
    }
  }

  const emojiBodies = emojis.map(emoji => getEmojiBody(emoji.type))

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
    addEmoji: (emojiType: EmojiType): IGameEngineEmoji => {
      const emojiBody = getEmojiBody(emojiType)
      Matter.World.add(world, emojiBody.body)
      return emojiBody
    }
  }
}
