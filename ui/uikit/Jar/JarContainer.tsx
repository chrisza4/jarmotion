import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { EmojiType, IEmoji } from '../../../domains/emojis/EmojiTypes'
import { usePrevious } from '../../../utils/reactHooks'
import createEmojiComponent from '../emoji/createEmojiComponent'
import Heart from '../emoji/Heart'
import Jar from './Jar'
import { JarHeight, JarWidth } from './JarConstants'
import { createJarboxMatter } from './JarEngine'
import PhysicalEmojiWrapper from './PhyscialEmojiWrapper'
import { IGameEngineEmoji, IJarEngine, PhysicsEngineFunc } from './Types'

interface IJarContainerProps {
  emojis: IEmoji[]
  top?: number
  left?: number
  init?: boolean
}

const withRenderer = (emoji: IGameEngineEmoji) => {
  switch (emoji.emojiType) {
    case EmojiType.Heart:
      return { ...emoji, renderer: PhysicalEmojiWrapper(Heart) }
    default:
      const EmojiComponent = createEmojiComponent({
        type: emoji.emojiType
      })
      return { ...emoji, renderer: PhysicalEmojiWrapper(EmojiComponent) }
  }
}

const JarContainer = (props: IJarContainerProps) => {
  const [engineInstance, setEngineInstance] = useState<IJarEngine | null>(null)
  const [emojiAddingQueue, setEmojiAddingQueue] = useState<IEmoji[]>([])
  // Compare previous emojis and get to update queue
  const previousEmojis = usePrevious(props.emojis)
  useEffect(() => {
    if (!previousEmojis) {
      return
    }
    const prevEmojisByKey = _.keyBy(previousEmojis, emoji => emoji.id)
    for (const emoji of props.emojis) {
      if (!prevEmojisByKey[emoji.id]) {
        setEmojiAddingQueue([...emojiAddingQueue, emoji])
      }
    }
  }, [props.emojis])

  useEffect(() => {
    setEngineInstance(createJarboxMatter(JarWidth, JarHeight, props.emojis))
  }, [])

  if (!engineInstance) {
    return null
  }

  const top = props.top || 0
  const left = props.left || 0
  const jarLeftCenter = (Dimensions.get('screen').width - JarWidth) / 2

  const {
    Physics,
    engine,
    world,
    ground,
    emojis,
    wallLeft,
    wallRight
  } = engineInstance

  const emojisObj = emojis.map(c => withRenderer(c))

  // Update if queue is exists
  const updateEntitiesEveryGameLoop: PhysicsEngineFunc = entities => {
    if (!engineInstance || emojiAddingQueue.length === 0) {
      return entities
    }
    for (const emojiToAdd of emojiAddingQueue) {
      const gameEngineEmojis = engineInstance.addEmoji(emojiToAdd.type)
      entities[emojiToAdd.id] = withRenderer(gameEngineEmojis)
    }
    setEmojiAddingQueue([])
    return entities
  }

  return (
    <View
      style={{
        height: JarHeight,
        left: jarLeftCenter
      }}
    >
      <GameEngine
        systems={[Physics, updateEntitiesEveryGameLoop]} // Array of Systems
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
