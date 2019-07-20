import Matter from 'matter-js'
import React from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import { GameEngine } from 'react-native-game-engine'

const { width, height } = Dimensions.get('screen')
const boxSize = Math.trunc(Math.max(width, height) * 0.075)
const engine = Matter.Engine.create({ enableSleeping: false })
const world = engine.world
const initialBox = Matter.Bodies.rectangle(
  width / 2,
  height / 2,
  boxSize,
  boxSize
)
const floor = Matter.Bodies.rectangle(
  width / 2,
  height - boxSize / 2,
  width,
  boxSize,
  { isStatic: true }
)
Matter.World.add(world, [initialBox, floor])

const Physics = (entities, { time }) => {
  const engine = entities.physics.engine
  Matter.Engine.update(engine, time.delta)
  return entities
}

let boxIds = 0

const CreateBox = (entities, { touches, screen }) => {
  const world = entities.physics.world
  const boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075)
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      const body = Matter.Bodies.circle(
        t.event.pageX,
        t.event.pageY,
        boxSize / 2,
        {
          frictionAir: 0,
          restitution: 1
        }
      )

      Matter.World.add(world, [body])

      entities[++boxIds] = {
        body,
        size: [boxSize, boxSize],
        color: boxIds % 2 === 0 ? 'pink' : '#B8E986',
        renderer: Box
      }
    })
  return entities
}

export default class App extends React.Component {
  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[Physics, CreateBox]} // Array of Systems
        entities={{
          physics: { engine, world },
          floor: {
            body: floor,
            size: [width, boxSize],
            color: 'green',
            renderer: Box
          },
          initialBox: {
            body: initialBox,
            size: [boxSize, boxSize],
            color: 'red',
            renderer: Box
          }
        }}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

class Box extends React.Component {
  render() {
    const width = this.props.size[0]
    const height = this.props.size[1]
    const x = this.props.body.position.x - width / 2
    const y = this.props.body.position.y - height / 2

    return (
      <View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: this.props.color || 'pink',
          borderWidth: 2,
          borderRadius: width,
          borderColor: 'black'
        }}
      />
    )
  }
}
