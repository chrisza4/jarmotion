import Matter from 'matter-js'
import React from 'react'
import { Image, StyleSheet, View, ViewStyle, Dimensions } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import Heart from './emoji/Heart'

const JarWidth = 130
const JarHeight = 220
const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')
const JarLeft = (screenWidth - JarWidth) / 2

const styles = StyleSheet.create({
  emoji: {
    position: 'absolute'
  }
})

const Physics = (entities: any, p: any) => {
  Matter.Engine.update(entities.physics.engine, p.time.delta)
  return entities
}

const engine = Matter.Engine.create({ enableSleeping: false })
const world = engine.world

const createHearth = () => {
  return Matter.Bodies.circle(JarLeft + 40, 0, 15, {
    frictionAir: 0.3,
    restitution: 0.2
  })
}

const Box = (props: any) => {
  const width = props.size[0]
  const height = props.size[1]
  const x = props.body.position.x
  const y = props.body.position.y
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y - height,
        width,
        height,
        backgroundColor: props.color || 'black',
        borderColor: 'black'
      }}
    />
  )
}

const createBounds = (
  left: number,
  right: number,
  width: number,
  height: number
) => {
  const rect = Matter.Bodies.rectangle(left, right, width, height, {
    isStatic: true
  })
  return {
    bound: rect,
    entities: {
      body: rect,
      size: [width, height],
      renderer: Box
    }
  }
}

const JarMargin = 10
// To make sure Emoji not get out of jar, we need to extends floor
// If you set to zero, Emojis can get out of jar
const floorExtension = 100
const JarBounds = [
  // Floor
  createBounds(
    JarLeft,
    JarHeight - JarMargin,
    JarWidth + floorExtension,
    JarMargin
  ),
  // Left
  createBounds(JarLeft, JarHeight, JarMargin, JarHeight),
  // Right
  createBounds(JarLeft + JarWidth - JarMargin, JarHeight, JarMargin, JarHeight)
]

const JarBoundsEntities = JarBounds.reduce((acc, val, key) => {
  return {
    ...acc,
    [`bounds${key}`]: val.entities
  }
}, {})

const hearts = [
  createHearth(),
  createHearth(),
  createHearth(),
  createHearth(),
  createHearth(),
  createHearth(),
  createHearth()
]

Matter.World.add(world, [...JarBounds.map(c => c.bound), ...hearts])
const hearthsObj = hearts.reduce((acc, val, key) => {
  return {
    ...acc,
    [`h${key}`]: { body: val, renderer: Heart }
  }
}, {})

type JarContainerProps = {
  style: ViewStyle
}
const JarContainer = (props: JarContainerProps) => {
  return (
    <GameEngine
      systems={[Physics]}
      entities={{
        physics: { engine, world: engine.world },
        ...JarBoundsEntities,
        ...hearthsObj
      }}
    >
      <View>
        <View style={{ position: 'absolute', left: JarLeft }}>
          <Jar />
        </View>
      </View>
    </GameEngine>
  )
}

const Jar = () => {
  return (
    <Image
      style={{
        width: JarWidth,
        height: JarHeight,
        resizeMode: 'contain'
      }}
      source={require('../../assets/jar.png')}
    />
  )
}

export default JarContainer
