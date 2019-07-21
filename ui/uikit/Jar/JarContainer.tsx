import React from 'react'
import { Dimensions, View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import Heart from '../emoji/Heart'
import Jar from './Jar'
import { JarHeight, JarWidth } from './JarConstants'
import { getEngine } from './JarEngine'
import PhysicalEmojiWrapper from './PhyscialEmojiWrapper'
import { IEmoji, IJarEngine } from './Types'

let engineInstance: IJarEngine | null = null

interface IJarContainerProps {
  emojis: IEmoji[]
  top?: number
  left?: number
  init?: boolean
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
  return (
    <View
      style={{
        height: JarHeight,
        left: jarLeftCenter
      }}
    >
      <GameEngine
        systems={[Physics]} // Array of Systems
        entities={{
          physics: { engine, world },
          ground: { ...ground, renderer: Box },
          ...emojis.map(c => ({
            ...c,
            renderer: PhysicalEmojiWrapper(Heart)
          })),
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
