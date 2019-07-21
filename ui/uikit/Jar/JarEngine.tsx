import Matter from 'matter-js'
import { IEmoji } from './Types'
import {
  EmojiType,
  IGameEngineEmoji,
  IJarEngine,
  PhysicsEngineFunc
} from './Types'

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
  const groundHeight = 100
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

  const wallLeft = {
    body: Matter.Bodies.rectangle(0, jarHeight, wallWidth, 1000, {
      isStatic: true
    }),
    size: {
      width: wallWidth,
      height: 1000
    }
  }

  const wallRight = {
    body: Matter.Bodies.rectangle(jarWidth - 10, jarHeight, wallWidth, 1000, {
      isStatic: true
    }),
    size: {
      width: wallWidth,
      height: 1000
    }
  }

  const getCircle = (emojiType: EmojiType): IGameEngineEmoji => ({
    body: Matter.Bodies.circle(
      jarWidth / 2,
      100,
      10,
      {
        angle: 30,
        frictionAir: 0,
        restitution: 0.52
      },
      6
    ),
    radius: 15,
    emojiType
  })

  const emojiBodies = emojis.map(emoji => getCircle(emoji.emojiType))

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
    wallRight
  }
}
