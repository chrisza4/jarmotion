import Matter from 'matter-js'
import React, { ReactNode } from 'react'
import { View } from 'react-native'

interface IPhysicalEmojiWrapperProps {
  body: Matter.Body
  radius: number
  renderEmoji: () => ReactNode
}

const PhysicalEmojiWrapper = (Component: React.ComponentType) => (
  props: IPhysicalEmojiWrapperProps
) => {
  const x = props.body.position.x
  const y = props.body.position.y
  const radius = props.radius
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: radius * 2,
        height: radius * 2
      }}
    >
      <Component />
    </View>
  )
}

export default PhysicalEmojiWrapper
