import React from 'react'
import { View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import Heart from '../emoji/Heart'
import Jar from './Jar'
import { getEngine } from './JarEngine'
import PhysicalEmojiWrapper from './PhyscialEmojiWrapper'

const Overlay = () => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'gray',
      opacity: 0.2
    }}
  />
)
const {
  Physics,
  engine,
  world,
  ground,
  circles,
  wallLeft,
  wallRight
} = getEngine(130, 222)

interface IEmoji {
  a?: any
}

interface IJarContainerProps {
  emojis: IEmoji[]
  top?: number
  left?: number
}

const JarContainer = (props: IJarContainerProps) => {
  const top = props.top || 0
  const left = props.left || 0
  return (
    <GameEngine
      systems={[Physics]} // Array of Systems
      entities={{
        physics: { engine, world },
        ground: { ...ground, renderer: Box },
        ...circles.map(c => ({ ...c, renderer: PhysicalEmojiWrapper(Heart) })),
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
      <Overlay />
      <View style={{ position: 'absolute', left: 0 }}>
        <Jar />
      </View>
    </GameEngine>
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
