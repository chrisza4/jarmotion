import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { AppState, Dimensions, View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { IEmoji } from '../../../domains/emojis/EmojiTypes'
import { useForceUpdate, usePrevious } from '../../../utils/reactHooks'
import createEmojiComponent from '../emoji/createEmojiComponent'
import { IWaitAnimatingEmoji } from './EmojiAddingQueue'
import * as EmojiAddingQueue from './EmojiAddingQueue'
import Jar from './Jar'
import { JarHeight, JarWidth } from './JarConstants'
import { assertJarboxMatter } from './JarEngine'
import PhysicalEmojiWrapper from './PhyscialEmojiWrapper'
import { IGameEngineEmoji, IJarEngine, PhysicsEngineFunc } from './Types'

interface IJarContainerProps {
  userId: string
  emojis: IEmoji[]
  top?: number
  left?: number
  init?: boolean
}

const withRenderer = (emoji: IGameEngineEmoji) => {
  const EmojiComponent = createEmojiComponent({
    type: emoji.emojiType
  })
  return { ...emoji, renderer: PhysicalEmojiWrapper(EmojiComponent) }
}

class JarGame {
  public static getInstance(): JarGame {
    if (!this.instance) {
      this.instance = new JarGame()
    }
    return this.instance
  }

  private static instance: JarGame | null = null
  private static readonly staticObject = [
    'physics',
    'ground',
    'wallLeft',
    'wallRight'
  ]
  public emojiAddingQueue: IWaitAnimatingEmoji[] = []
  private engineInstance: IJarEngine | null = null
  private isEmojiClearing = false
  private constructor() {}

  public setEmojiAddingQueue = (newQueue: IWaitAnimatingEmoji[]) => {
    this.emojiAddingQueue = newQueue
  }
  public setEngineInstance = (engine: IJarEngine) => {
    this.engineInstance = engine
  }

  public gameLoop: PhysicsEngineFunc = entities => {
    if (this.isEmojiClearing) {
      this.isEmojiClearing = false
      this.deleteAllEmojisInGameLoop(entities)
    }
    if (!this.engineInstance || this.emojiAddingQueue.length === 0) {
      return entities
    }

    const toAnimated = EmojiAddingQueue.deQueueWaitingEmojis(
      this.emojiAddingQueue
    )
    if (!toAnimated.emojiToAnimated) {
      return entities
    }
    const emojiToAdd = toAnimated.emojiToAnimated
    const gameEngineEmojis = this.engineInstance.addEmoji(
      emojiToAdd.type,
      emojiToAdd.id
    )
    entities[emojiToAdd.id] = withRenderer(gameEngineEmojis)
    this.setEmojiAddingQueue(toAnimated.newQueue)
    return entities
  }

  public replaceEmojiSet = (newQueue: IWaitAnimatingEmoji[]) => {
    this.clearEmojis()
    this.setEmojiAddingQueue(newQueue)
  }

  private clearEmojis = () => {
    this.engineInstance?.clearEmojis()
    // For game loop to catch and remove
    this.isEmojiClearing = true
  }

  private deleteAllEmojisInGameLoop(entities: any) {
    const emojiKeys = Object.keys(entities).filter(
      k => !JarGame.staticObject.includes(k)
    )
    for (const k of emojiKeys) {
      delete entities[k]
    }
  }
}

const JarContainer = (props: IJarContainerProps) => {
  const [engineInstance, setEngineInstance] = useState<IJarEngine | null>(null)
  const jarGame = JarGame.getInstance()

  const currentEmojis = useMemo(
    () => props.emojis.filter(e => e.owner_id === props.userId),
    [props.emojis, props.userId]
  )

  const updateEmojis = () => {
    const queue = currentEmojis.map(emoji => ({
      emoji,
      expected_animated_time: null
    }))
    jarGame.replaceEmojiSet(queue)
  }

  // Compare previous emojis and add accordingly
  const previousEmojis = usePrevious(props.emojis)
  useEffect(() => {
    if (!previousEmojis) {
      return
    }
    const prevEmojisByKey = _.keyBy(previousEmojis, emoji => emoji.id)
    const toAddedEmojis = currentEmojis
      .filter(emoji => !prevEmojisByKey[emoji.id])
      .map(emoji => ({ emoji, expected_animated_time: null }))
    jarGame.setEmojiAddingQueue([...jarGame.emojiAddingQueue, ...toAddedEmojis])
  }, [props.emojis])

  // Clear Emoji on user Id Changes
  useEffect(() => {
    updateEmojis()
  }, [props.userId])

  // Initialize JarEngine
  useEffect(() => {
    const newEngine = assertJarboxMatter(JarWidth, JarHeight, [], 'singleton')
    setEngineInstance(newEngine)
    jarGame.setEngineInstance(newEngine)
    updateEmojis()
  }, [])

  // Listen to app state changes and reset
  const forceUpdate = useForceUpdate()
  useEffect(() => {
    AppState.addEventListener('change', forceUpdate)
    return () => {
      AppState.removeEventListener('change', forceUpdate)
    }
  }, [])

  if (!engineInstance) {
    return null
  }

  const {
    Physics,
    engine,
    world,
    ground,
    emojis,
    wallLeft,
    wallRight
  } = engineInstance

  const top = props.top || 0
  const left = props.left || 0
  const jarLeftCenter = (Dimensions.get('screen').width - JarWidth) / 2

  const emojisObj = emojis.map(c => withRenderer(c))
  return (
    <View
      style={{
        height: JarHeight,
        left: jarLeftCenter
      }}
    >
      <GameEngine
        systems={[Physics, jarGame.gameLoop]} // Array of Systems
        entities={{
          physics: { engine, world },
          ground: { ...ground, renderer: SolidDenseBox },
          ...emojisObj,
          wallLeft: { ...wallLeft, renderer: SolidDenseBox },
          wallRight: { ...wallRight, renderer: SolidDenseBox }
        }}
        style={{
          position: 'absolute',
          width: '100%',
          top,
          left
        }}
      >
        <View style={{ position: 'absolute', left: 0 }}>
          <Jar />
        </View>
      </GameEngine>
    </View>
  )
}

const SolidDenseBox = (props: any) => {
  const width = props.size.width
  const height = props.size.height
  const x = props.body.position.x
  const y = props.body.position.y
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y - height / 2,
        width,
        height: height / 2,
        backgroundColor: props.color || 'transparent',
        opacity: 0.5,
        borderWidth: 0
      }}
    />
  )
}

export default JarContainer
