import Matter from 'matter-js'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import Heart from './emoji/Heart'

const JarWidth = 130
const JarHeight = 220

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
const bottomJarBody = Matter.Bodies.rectangle(50, 200, JarWidth, 1, {
  isStatic: true
})
const heartBody = Matter.Bodies.circle(50, 20, 15, {
  frictionAir: 0.1,
  restitution: 0.5
})

Matter.World.add(world, [bottomJarBody, heartBody])

const JarContainer = () => {
  return (
    <GameEngine
      systems={[Physics]}
      entities={{
        physics: { engine, world: engine.world },
        heart: { body: heartBody, renderer: Heart },
        floor: {
          body: bottomJarBody,
          size: [JarWidth, JarHeight],
          renderer: Box
        }
      }}
    >
      <View>
        <Jar />
        {/* <View style={styles.emoji}>
          <Heart />
        </View> */}
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
        top: y,
        width,
        height,
        backgroundColor: props.color || 'black',
        borderWidth: 2,
        borderColor: 'black'
      }}
    />
  )
}

export default JarContainer
