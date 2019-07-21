import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import Heart from '../emoji/Heart'
import Jar from './Jar'
import { JarHeight, JarWidth } from './JarConstants'
import { getEngine } from './JarEngine'
import PhysicalEmojiWrapper from './PhyscialEmojiWrapper'
import {
  EmojiType,
  IEmoji,
  IGameEngineEmoji,
  IJarEngine,
  PhysicsEngineFunc
} from './Types'

let engineInstance: IJarEngine | null = null

interface IJarContainerProps {
  emojis: IEmoji[]
  top?: number
  left?: number
  init?: boolean
}

let timeoutState = 'no'

const withRenderer = (emoji: IGameEngineEmoji) => {
  switch (emoji.emojiType) {
    case EmojiType.Heart:
    default:
      return { ...emoji, renderer: PhysicalEmojiWrapper(Heart) }
  }
}
const JarContainer = (props: IJarContainerProps) => {
  const top = props.top || 0
  const left = props.left || 0
  const jarLeftCenter = (Dimensions.get('screen').width - JarWidth) / 2
  if (!engineInstance) {
    engineInstance = getEngine(JarWidth, JarHeight, props.emojis)
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

  const emojisObj = emojis.map(c => withRenderer(c))

  const updateEntities: PhysicsEngineFunc = entities => {
    if (timeoutState === 'no') {
      timeoutState = 'wait-for-kick-in'
      setInterval(() => {
        if (engineInstance) {
          const gameEngineEmojis = engineInstance.addEmoji({
            emojiType: EmojiType.Heart
          })
          entities.new = withRenderer(gameEngineEmojis)
        }
      }, 2000)
    } else if (timeoutState === 'kick-in') {
      timeoutState = 'done'
    }
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
        systems={[Physics, updateEntities]} // Array of Systems
        entities={{
          physics: { engine, world },
          ground: { ...ground, renderer: Box },
          ...emojisObj,
          wallLeft: { ...wallLeft, renderer: Box },
          wallRight: { ...wallRight, renderer: Box }
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

const Box = (props: any) => {
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
